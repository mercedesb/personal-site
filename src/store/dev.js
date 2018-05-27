import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const landingPages = {
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
}

const DevStore = new Vuex.Store({
  state: {
    errors: [],
    blogPosts: [],
    blogPost: {},
    landingPage: {},
    homePage: {},
    navLinks: [],
    entries: []
  },
  mutations: {
    blogPosts (state, blogPosts) {
      state.blogPosts = blogPosts
    },
    blogPost (state, blogPost) {
      state.blogPost = blogPost
    },
    landingPage (state, landingPage) {
      state.landingPage = landingPage
    },
    homePage (state, homePage) {
      state.homePage = homePage
    },
    navLinks (state, navLinks) {
      state.navLinks = navLinks
    },
    entries (state, entries) {
      state.entries = entries
    },
    clearBlogPosts (state) {
      state.blogPosts = []
    },
    clearBlogPost (state) {
      state.blogPost = {}
    },
    clearLandingPage (state) {
      state.landingPage = {}
    },
    clearHomePage (state) {
      state.homePage = {}
    },
    clearNavLinks (state) {
      state.navLinks = []
    },
    clearEntries (state) {
      state.entries = []
    }
  },
  actions: {
    getBlogPosts (context) {
      context.commit('clearBlogPosts')
      context.commit('blogPosts', [
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
      ])
    },
    getBlogPost (context, urlSegment) {
      context.commit('clearBlogPost')
      context.commit('blogPost', {
        id: 'blogPost1',
        title: 'blog post 1 title',
        preamble: 'blog post 1 preamble',
        mainContent: '',
        urlSegment: '',
        tags: [],
        publishDate: '2018-04-25T00:00-05:00'
      })
    },
    getLandingPage (context, urlSegment) {
      context.commit('clearLandingPage')
      let lp = {}// landingPages[urlSegment]
      if (!lp) {
        lp = {
          title: 'Test',
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
          urlSegment: 'test',
          externalLink: '',
          color: 'red',
          showContact: false,
          showBlogPosts: false
        }
      }
      context.commit('landingPage', lp)
    },
    getHomePage (context) {
      debugger
      context.commit('clearHomePage')
      const homePage = 
      {
        id: 'homepage',
        preamble: 'here is the dev homepage preamble, it\'s a little long to be more realistic',
        mainImage: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        children: Object.keys(landingPages).map((key, index) => {
          return {
            sys: {
              id: `child ${index}`
            },
            fields: {
              ...landingPages[key]
            }
          }
        }),
        backgroundImages: [
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          },
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          },
          {
            fields: {
              file: {
                url: 'http://placeholder.pics/svg/300'
              }
            }
          }
        ]
      }
      context.commit('homePage', homePage)
    },
    getNavLinks (context) {
      context.commit('clearNavLinks')
      const navLinks = Object.keys(landingPages).map((key) => {
        return landingPages[key]
      })
      context.commit('navLinks', navLinks)
    }
  }
})

export { DevStore }
