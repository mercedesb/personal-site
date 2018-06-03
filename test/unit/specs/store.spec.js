import { mutations } from '@/store'

describe('Vuex store', () => {
  describe('mutations.blogPosts', () => {
    it('sets the blogPosts state', () => {
      const { blogPosts } = mutations
      const state = { blogPosts: [] }

      blogPosts(state, [{}, {}])

      expect(state.blogPosts.length).toEqual(2)
    })
  })

  describe('mutations.blogPost', () => {
    it('sets the blogPost state', () => {
      const { blogPost } = mutations
      const state = { blogPost: {} }
      const expectedBlogPost  = { 'title': 'blog post'}

      blogPost(state, expectedBlogPost)

      expect(state.blogPost).toEqual(expectedBlogPost)
    })
  })

  describe('mutations.landingPage', () => {
    it('sets the landingPage state', () => {
      const { landingPage } = mutations
      const state = { landingPage: [] }
      const expectedLandingPage  = { 'title': 'landing page'}

      landingPage(state, expectedLandingPage)

      expect(state.landingPage).toEqual(expectedLandingPage)
    })
  })

  describe('mutations.homePage', () => {
    it('sets the homePage state', () => {
      const { homePage } = mutations
      const state = { homePage: [] }
      const expectedHomePage  = { 'title': 'home page'}

      homePage(state, expectedHomePage)

      expect(state.homePage).toEqual(expectedHomePage)
    })
  })

  describe('mutations.navLinks', () => {
    it('sets the navLinks state', () => {
      const { navLinks } = mutations
      const state = { navLinks: [] }

      navLinks(state, [{}, {}])

      expect(state.navLinks.length).toEqual(2)
    })
  })

  describe('mutations.backgroundImages', () => {
    it('sets the backgroundImages state', () => {
      const { backgroundImages } = mutations
      const state = { backgroundImages: [] }

      backgroundImages(state, [{}, {}])

      expect(state.backgroundImages.length).toEqual(2)
    })
  })

  describe('mutations.entries', () => {
    it('sets the entries state', () => {
      const { entries } = mutations
      const state = { entries: [] }

      entries(state, [{}, {}])

      expect(state.entries.length).toEqual(2)
    })
  })
  
  describe('mutations.clearBlogPosts', () => {
    it('sets the blogPosts state', () => {
      const { clearBlogPosts } = mutations
      const state = { blogPosts: [{}, {}] }

      clearBlogPosts(state)

      expect(state.blogPosts.length).toEqual(0)
    })
  })

  describe('mutations.clearBlogPost', () => {
    it('sets the blogPost state', () => {
      const { clearBlogPost } = mutations
      const state = { blogPost: {' title': 'blog post' } }

      clearBlogPost(state)

      expect(state.blogPost).toEqual({})
    })
  })

  describe('mutations.clearLandingPage', () => {
    it('sets the landingPage state', () => {
      const { clearLandingPage } = mutations
      const state = { landingPage: {' title': 'landing page' } }

      clearLandingPage(state)

      expect(state.landingPage).toEqual({})
    })
  })

  describe('mutations.clearHomePage', () => {
    it('sets the homePage state', () => {
      const { clearHomePage } = mutations
      const state = { homePage: {' title': 'home page' } }

      clearHomePage(state)

      expect(state.homePage).toEqual({})
    })
  })
})

describe('mutations.clearNavLinks', () => {
    it('sets the navLinks state', () => {
      const { clearNavLinks } = mutations
      const state = { navLinks: [{}, {}] }

      clearNavLinks(state)

      expect(state.navLinks.length).toEqual(0)
    })
  })

  describe('mutations.clearBackgroundImages', () => {
    it('sets the backgroundImages state', () => {
      const { clearBackgroundImages } = mutations
      const state = { backgroundImages: [{}, {}] }

      clearBackgroundImages(state)

      expect(state.backgroundImages.length).toEqual(0)
    })
  })

  describe('mutations.clearEntries', () => {
    it('sets the entries state', () => {
      const { clearEntries } = mutations
      const state = { entries: [{}, {}] }

      clearEntries(state)

      expect(state.entries.length).toEqual(0)
    })
  })
