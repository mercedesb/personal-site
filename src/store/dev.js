import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const landingPages = {
  about: {
    sys: {
      id: 'about',
    },
    fields: {
      title: 'About',
      preamble: '',
      icon: {
        fields: {
          file: {
            url: 'http://placeholder.pics/svg/300'
          }
        }
      },
      mainContent: 'about content here',
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
    }
  },
  blog: {
    sys: {
      id: 'blog',
    },
    fields: {
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
    }
  },
  connect: {
    sys: {
      id: 'connect',
    },
    fields: {
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
    }
  },
  shop: {
    sys: {
      id: 'shop',
    },
    fields: {
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
}

const DevStore = new Vuex.Store({
  state: {
    errors: [],
    blogPosts: [],
    blogPost: {},
    landingPage: {},
    homePage: {},
    navLinks: [],
    backgroundImages: [],
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
    backgroundImages (state, backgroundImages) {
      state.backgroundImages = backgroundImages
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
    clearBackgroundImages (state) {
      state.backgroundImages = []
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
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        },
        {
          title: '',
          preamble: '',
          mainContent: '',
          urlSegment: '',
          tags: [],
          publishDate: ''
        }
      ])
    },
    getBlogPost (context, urlSegment) {
      context.commit('clearBlogPost')
      const bp = {
        title: '',
        preamble: '',
        mainContent: '',
        urlSegment: urlSegment,
        tags: [],
        publishDate: ''
      }
      context.commit('blogPost', bp)
      return bp
    },
    getLandingPage (context, urlSegment) {
      context.commit('clearLandingPage')
      let lp
      if (landingPages[urlSegment]) {
        lp = {
          id: landingPages[urlSegment].sys.id,
          ...landingPages[urlSegment].fields
        }
      }
      else {
        lp = {
          title: '',
          preamble: '',
          icon: '',
          mainContent: '',
          ctaLinks: '',
          urlSegment: '',
          externalLink: '',
          color: '',
          showContact: '',
          showBlogPosts: ''
        }
      }
      context.commit('landingPage', lp)
      return lp
    },
    getHomePage (context) {
      context.commit('clearHomePage')
      const homePage = {
        id: 'homepage',
        preamble: 'here is the dev homepage preamble, it\'s a little long to be more realistic',
        mainImage: {
          fields: {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        },
        children: Object.keys(landingPages).map((key) => {
          return landingPages[key]
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
      context.commit('navLinks', Object.keys(landingPages).map((key) => {
        return {
          id: landingPages[key].sys.id,
          ...landingPages[key].fields
        }
      }))
    },
    getBackgroundImages (context) {
      context.commit('clearBackgroundImages')
      context.commit('backgroundImages', [
          {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          },
          {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          },
          {
            file: {
              url: 'http://placeholder.pics/svg/300'
            }
          }
        ])
    }
  }
})

export { DevStore }
