import { mutations, actions } from '@/store'

const mockGetEntries = jest.fn(() => Promise.resolve({
  items: [
    {
      sys: {
        id: 'entry 1'
      },
      fields: {}
    },
    {
      sys: {
        id: 'entry 2'
      },
      fields: {}
    }
  ]
})
)

jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({
    getEntries: mockGetEntries
  }))
}))

describe('mutations', () => {
  describe('blogPosts', () => {
    it('sets the blogPosts state', () => {
      const { blogPosts } = mutations
      const state = { blogPosts: [] }

      blogPosts(state, [{}, {}])

      expect(state.blogPosts.length).toEqual(2)
    })
  })

  describe('maxBlogPostPages', () => {
    it('sets the maxBlogPostPages state', () => {
      const { maxBlogPostPages } = mutations
      const state = { maxBlogPostPages: 0 }

      maxBlogPostPages(state, 15)

      expect(state.maxBlogPostPages).toEqual(15)
    })
  })

  describe('blogPost', () => {
    it('sets the blogPost state', () => {
      const { blogPost } = mutations
      const state = { blogPost: {} }
      const expectedBlogPost = { 'title': 'blog post' }

      blogPost(state, expectedBlogPost)

      expect(state.blogPost).toEqual(expectedBlogPost)
    })
  })

  describe('landingPage', () => {
    it('sets the landingPage state', () => {
      const { landingPage } = mutations
      const state = { landingPage: [] }
      const expectedLandingPage = { 'title': 'landing page' }

      landingPage(state, expectedLandingPage)

      expect(state.landingPage).toEqual(expectedLandingPage)
    })
  })

  describe('homePage', () => {
    it('sets the homePage state', () => {
      const { homePage } = mutations
      const state = { homePage: [] }
      const expectedHomePage = { 'title': 'home page' }

      homePage(state, expectedHomePage)

      expect(state.homePage).toEqual(expectedHomePage)
    })
  })

  describe('navLinks', () => {
    it('sets the navLinks state', () => {
      const { navLinks } = mutations
      const state = { navLinks: [] }

      navLinks(state, [{}, {}])

      expect(state.navLinks.length).toEqual(2)
    })
  })

  describe('backgroundImages', () => {
    it('sets the backgroundImages state', () => {
      const { backgroundImages } = mutations
      const state = { backgroundImages: [] }

      backgroundImages(state, [{}, {}])

      expect(state.backgroundImages.length).toEqual(2)
    })
  })

  describe('entries', () => {
    it('sets the entries state', () => {
      const { entries } = mutations
      const state = { entries: [] }

      entries(state, [{}, {}])

      expect(state.entries.length).toEqual(2)
    })
  })

  describe('total', () => {
    it('sets the total state', () => {
      const { total } = mutations
      const state = { total: 0 }

      total(state, 15)

      expect(state.total).toEqual(15)
    })
  })

  describe('clearBlogPosts', () => {
    it('sets the blogPosts state', () => {
      const { clearBlogPosts } = mutations
      const state = { blogPosts: [{}, {}] }

      clearBlogPosts(state)

      expect(state.blogPosts.length).toEqual(0)
    })
  })

  describe('clearMaxBlogPostPages', () => {
    it('sets the blogPosts state', () => {
      const { clearMaxBlogPostPages } = mutations
      const state = { maxBlogPostPages: 15 }

      clearMaxBlogPostPages(state)

      expect(state.maxBlogPostPages).toEqual(0)
    })
  })

  describe('clearBlogPost', () => {
    it('sets the blogPost state', () => {
      const { clearBlogPost } = mutations
      const state = { blogPost: { ' title': 'blog post' } }

      clearBlogPost(state)

      expect(state.blogPost).toEqual({})
    })
  })

  describe('clearLandingPage', () => {
    it('sets the landingPage state', () => {
      const { clearLandingPage } = mutations
      const state = { landingPage: { ' title': 'landing page' } }

      clearLandingPage(state)

      expect(state.landingPage).toEqual({})
    })
  })

  describe('clearHomePage', () => {
    it('sets the homePage state', () => {
      const { clearHomePage } = mutations
      const state = { homePage: { ' title': 'home page' } }

      clearHomePage(state)

      expect(state.homePage).toEqual({})
    })
  })

  describe('clearNavLinks', () => {
    it('sets the navLinks state', () => {
      const { clearNavLinks } = mutations
      const state = { navLinks: [{}, {}] }

      clearNavLinks(state)

      expect(state.navLinks.length).toEqual(0)
    })
  })

  describe('clearBackgroundImages', () => {
    it('sets the backgroundImages state', () => {
      const { clearBackgroundImages } = mutations
      const state = { backgroundImages: [{}, {}] }

      clearBackgroundImages(state)

      expect(state.backgroundImages.length).toEqual(0)
    })
  })

  describe('clearEntries', () => {
    it('sets the entries state', () => {
      const { clearEntries } = mutations
      const state = { entries: [{}, {}] }

      clearEntries(state)

      expect(state.entries.length).toEqual(0)
    })
  })

  describe('clearTotal', () => {
    it('sets the blogPosts state', () => {
      const { clearTotal } = mutations
      const state = { total: 15 }

      clearTotal(state)

      expect(state.total).toEqual(0)
    })
  })
})

describe('actions', () => {
  let commit
  let dispatch

  beforeEach(() => {
    commit = jest.fn()
  })

  describe('getBlogPosts', () => {
    beforeEach(() => {
      dispatch = mockGetEntries
    })

    it('returns an array of objects', () => {
      const { getBlogPosts } = actions

      getBlogPosts({ commit, dispatch }, {page: 1, pageSize: 10})
        .then(result => {
          expect(result.length).toEqual(2)
        })
    })

    it('commits blogPosts to state', () => {
      const { getBlogPosts } = actions

      getBlogPosts({ commit, dispatch }, { page: 1, pageSize: 10 })
        .then(result => {
          expect(commit).toHaveBeenCalledWith('blogPosts', expect.anything())
        })
    })

    it('commits maxBlogPostPages to state', () => {
      const { getBlogPosts } = actions

      getBlogPosts({ commit, dispatch }, { page: 1, pageSize: 10 })
        .then(result => {
          expect(commit).toHaveBeenCalledWith('maxBlogPostPages', expect.anything())
        })
    })
  })

  describe('getBlogPost', () => {
    let state

    describe('with blogPosts in state', () => {
      beforeEach(() => {
        state = {
          blogPosts: [{ title: 'blog post 1', urlSegment: 'blog' }, { title: 'blog post 2' }]
        }
      })

      it('returns an object', () => {
        const { getBlogPost } = actions
        getBlogPost({ commit, dispatch, state }, 'blog')
          .then(result => {
            expect(result).toBeDefined()
            expect(result).not.toEqual({})
          })
      })

      it('commits an entry to blogPost state', () => {
        const { getBlogPost } = actions

        getBlogPost({ commit, dispatch, state }, 'blog')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('blogPost', expect.anything())
          })
      })
    })

    describe('without blogPosts in state', () => {
      beforeEach(() => {
        dispatch = mockGetEntries
        state = {
          blogPosts: []
        }
      })
      it('returns an object', () => {
        const { getBlogPost } = actions

        getBlogPost({ commit, dispatch, state }, '')
          .then(result => {
            expect(result).toBeDefined()
            expect(result).not.toEqual({})
          })
      })

      it('commits an entry to blogPost state', () => {
        const { getBlogPost } = actions

        getBlogPost({ commit, dispatch, state }, '')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('blogPost', expect.anything())
          })
      })
    })
  })

  describe('getLandingPage', () => {
    beforeEach(() => {
      dispatch = mockGetEntries
    })

    it('returns an object', () => {
      const { getLandingPage } = actions

      getLandingPage({ commit, dispatch }, '')
        .then(result => {
          expect(result).toBeDefined()
          expect(result).not.toEqual({})
        })
    })

    it('commits an entry to landingPage state', () => {
      const { getLandingPage } = actions

      getLandingPage({ commit, dispatch }, '')
        .then(result => {
          expect(commit).toHaveBeenCalledWith('landingPage', expect.anything())
        })
    })
  })

  describe('getHomePage', () => {
    beforeEach(() => {
      dispatch = mockGetEntries
    })

    it('returns an object', () => {
      const { getHomePage } = actions

      getHomePage({ commit, dispatch }, '')
        .then(result => {
          expect(result).toBeDefined()
          expect(result).not.toEqual({})
        })
    })

    it('commits an entry to homePage state', () => {
      const { getHomePage } = actions

      getHomePage({ commit, dispatch }, '')
        .then(result => {
          expect(commit).toHaveBeenCalledWith('homePage', expect.anything())
        })
    })
  })

  describe('getNavLinks', () => {
    let state

    describe('with homePage in state', () => {
      beforeEach(() => {
        state = {
          homePage: {
            children: [
              {
                sys: {
                  id: 'child 1'
                },
                fields: {}
              },
              {
                sys: {
                  id: 'child 2'
                },
                fields: {}
              },
              {
                sys: {
                  id: 'child 3'
                },
                fields: {}
              }
            ]
          }
        }
      })

      it('returns an array of objects', () => {
        const { getNavLinks } = actions

        getNavLinks({ commit, dispatch, state }, '')
          .then(result => {
            expect(result.length).toEqual(3)
          })
      })

      it('commits navLinks to state', () => {
        const { getNavLinks } = actions

        getNavLinks({ commit, dispatch, state }, '')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('navLinks', expect.anything())
          })
      })
    })

    describe('without homePage in state', () => {
      beforeEach(() => {
        dispatch = mockGetEntries
        state = {
          homePage: {}
        }
      })

      it('returns an array of objects', () => {
        const { getNavLinks } = actions

        getNavLinks({ commit, dispatch, state }, '')
          .then(result => {
            expect(result.length).toEqual(2)
          })
      })

      it('commits navLinks to state', () => {
        const { getNavLinks } = actions

        getNavLinks({ commit, dispatch, state }, '')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('navLinks', expect.anything())
          })
      })
    })
  })

  describe('getBackgroundImages', () => {
    let state

    describe('with homePage in state', () => {
      beforeEach(() => {
        state = {
          homePage: {
            backgroundImages: [
              {
                sys: {
                  id: 'img 1'
                },
                fields: {}
              },
              {
                sys: {
                  id: 'img 2'
                },
                fields: {}
              },
              {
                sys: {
                  id: 'img 3'
                },
                fields: {}
              }
            ]
          }
        }
      })

      it('returns an array of objects', () => {
        const { getBackgroundImages } = actions

        getBackgroundImages({ commit, dispatch, state }, '')
          .then(result => {
            expect(result.length).toEqual(3)
          })
      })

      it('commits backgroundImages to state', () => {
        const { getBackgroundImages } = actions

        getBackgroundImages({ commit, dispatch, state }, '')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('backgroundImages', expect.anything())
          })
      })
    })

    describe('without homePage in state', () => {
      beforeEach(() => {
        dispatch = mockGetEntries
        state = {
          homePage: {}
        }
      })

      it('returns an array of objects', () => {
        const { getBackgroundImages } = actions

        getBackgroundImages({ commit, dispatch, state }, '')
          .then(result => {
            expect(result.length).toEqual(2)
          })
      })

      it('commits backgroundImages to state', () => {
        const { getBackgroundImages } = actions

        getBackgroundImages({ commit, dispatch, state }, '')
          .then(result => {
            expect(commit).toHaveBeenCalledWith('backgroundImages', expect.anything())
          })
      })
    })
  })

  describe('getEntries', () => {
    it('returns an array of objects', () => {
      const { getEntries } = actions

      getEntries({ commit, dispatch }, '')
        .then(result => {
          expect(result.length).toEqual(2)
        })
    })

    it('commits entries to state', () => {
      const { getEntries } = actions

      getEntries({ commit, dispatch }, '')
        .then(result => {
          expect(commit).toHaveBeenCalledWith('entries', expect.anything())
        })
    })
  })
})
