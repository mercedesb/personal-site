import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import SmartLink from '../../../src/components/SmartLink.vue'

export const TestUtility = (function() {
  const defaultConfiguration = {
    stubs: ['router-link'],
    mocks: {
      $route: {
        params: {
          urlSegment: 'somePath'
        }
      }
    }
  }

  function configure() {
    const localVue = createLocalVue()
    localVue.component('smart-link', SmartLink)
    localVue.use(Vuex)
    return localVue
  }

  function getOptions(config = {}) {
    const { store, ...localConfig } = config
    let localStore
    
    const localVue = configure()

    if (!!store) {
      localStore = new Vuex.Store(store)
      localStore.dispatch = jest.fn(() => Promise.resolve({not: 'empty'}))
    }

    return {
      localVue,
      store: localStore,
      ...defaultConfiguration,
      ...localConfig
    }
  }

  return {
    shallow: function(Component, config = {}) {
      return shallowMount(Component, {
        ...getOptions(config)
      })
    },
    mount: function(Component, config = {}) {
      return mount(Component, {
        ...getOptions(config)
      })
    },
    mockRoute: defaultConfiguration.mocks.$route.params.urlSegment,
    landingPages: {
      about: {
        title: 'About',
        preamble: '',
        icon: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        mainContent: '',
        ctaLinks: [
        {
          sys: {
            id: 'cta 1'
          },
          fields: {
            title: 'Resume',
            icon: {
              fields: {
                file: {
                  url: 'http://placeholder.pics/svg/300'
                }
              }
            },
            internalLink: {
              fields: {
                urlSegment: 'resume'
              }
            },
            externalLink: ''
          }
        },
        {
          sys: {
            id: 'cta 2'
          },
          fields: {
            title: 'External CTA',
            icon: {
              fields: {
                file: {
                  url: 'http://placeholder.pics/svg/300'
                }
              }
            },
            internalLink: {
              fields: {
                urlSegment: ''
              }
            },
            externalLink: 'http://google.com'
          }
        }
        ],
        urlSegment: 'about',
        externalLink: '',
        color: 'blue',
        showContact: false,
        showBlogPosts: false
      },
      blog: {
        title: 'Blog',
        preamble: '',
        icon: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        mainContent: '',
        ctaLinks: [],
        urlSegment: 'blog',
        externalLink: '',
        color: 'gray',
        showContact: false,
        showBlogPosts: true
      },
      connect: {
        title: 'Connect',
        preamble: '',
        icon: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        mainContent: '',
        ctaLinks: [],
        urlSegment: 'connect',
        externalLink: '',
        color: 'red',
        showContact: true,
        showBlogPosts: false
      },
      shop: {
        title: 'Shop',
        preamble: '',
        icon: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        mainContent: '',
        ctaLinks: [],
        urlSegment: '',
        externalLink: 'https://etsy.com/shop/blinddogyarns',
        color: 'yellow',
        showContact: false,
        showBlogPosts: false
      }
    },
    blogPosts: [
      {
        id: 'blogPost1',
        title: 'blog post 1 title',
        preamble: 'blog post 1 preamble',
        mainContent: '',
        urlSegment: '',
        tags: [],
        publishDate: '2018-04-25T00:00-05:00'
      },
      {
        id: 'blogPost2',
        title: 'blog post 2 title',
        preamble: 'blog post 2 preamble',
        mainContent: '',
        urlSegment: '',
        tags: [],
        publishDate: '2018-04-23T00:00-05:00'
      },
      {
        id: 'blogPost3',
        title: 'blog post 3 title',
        preamble: 'blog post 3 preamble',
        mainContent: '',
        urlSegment: '',
        tags: [],
        publishDate: '2018-04-22T00:00-05:00'
      }
    ]
  }
})()
