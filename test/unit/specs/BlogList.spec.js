import BlogList from '@/components/BlogList.vue'
import { TestUtility } from './TestUtility'

describe('BlogList', () => {
  let component

  const initialProps = {
    color: 'gray'
  }

  const store = {
    state: {
      blogPosts: TestUtility.blogPosts
    }
  }

  const shallow = propsData => TestUtility.shallow(BlogList, {
    store,
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow({color: undefined})
        expect(component.element).toMatchSnapshot()
      })
    })
  })


  describe('Computed', () => {
    describe('posts', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has posts populated', () => {
        expect(component.vm.posts).toBeDefined()
      })

      it('creates a color prop on the posts', () => {
        expect(component.vm.posts[0].color).toEqual(initialProps.color)
      })

      it('creates a date prop on the posts', () => {
        expect(component.vm.posts[0].date).toBeDefined()
      })
    })

    describe('featuredPost', () => {
      it('has featuredPost populated', () => {
        expect(component.vm.featuredPost).toBeDefined()
      })

      it('returns the first post as featured', () => {
        const expected = {
          featured: true,
          ...component.vm.posts[0]
        }
        expect(component.vm.featuredPost).toEqual(expected)
      })
    })

    describe('remainingPosts', () => {
      it('has remainingPosts populated', () => {
        expect(component.vm.remainingPosts).toBeDefined()
      })

      it('returns the second through end post', () => {
        const expected = component.vm.posts.slice(1)
        expect(component.vm.remainingPosts).toEqual(expected)
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getBlogPosts to the store', () => {
        component = TestUtility.mount(BlogList, {
          store,
          propsData: {
            ...initialProps
          }
        })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getBlogPosts')
      })
    })
  })
})
