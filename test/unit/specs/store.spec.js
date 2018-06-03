import { mutations } from '@/store'

describe('Vuex store', () => {
  // destructure assign `mutations`
  describe('mutations.blogPosts', () => {
    it('sets the blogPosts state', () => {
      const { blogPosts } = mutations
      const state = { blogPosts: [] }

      blogPosts(state, [{}, {}])

      expect(state.blogPosts.length).toEqual(2)
    })
  })
})
