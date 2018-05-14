import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BlogList from '@/components/BlogList.vue'
import Setup from './Setup'
import Vuex from 'vuex'

describe('BlogList', () => {
  let component

  Setup.configure()

  const initialProps = {
    color: 'gray'
  }

  const store = new Vuex.Store({
    state: {
      blogPosts: Setup.blogPosts
    }
  })
  store.dispatch = jest.fn()

  const shallow = propsData => shallowMount(BlogList, { 
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

  describe('Properties', () => {
    it('has a color property', () => {
      component = shallow()
      expect(component.props().color).toBe('gray')
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
        component = mount(BlogList, { 
          store,
          propsData: {
            ...initialProps
          }
         })
        expect(store.dispatch).toHaveBeenCalledWith('getBlogPosts')
      })
    })
  })
})