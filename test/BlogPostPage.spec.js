import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BlogPostPage from '@/components/pages/BlogPostPage.vue'
import Setup from './Setup'
import Vuex from 'vuex'

describe('BlogPostPage', () => {
  let component

  Setup.configure()

  const initialProps = {
    color: 'blue'
  }

  const store = new Vuex.Store({
    state: {
      blogPost: Setup.blogPosts[0]
    }
  })
  store.dispatch = jest.fn()

  const shallow = propsData => Setup.shallow(BlogPostPage, {
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
      expect(component.props().color).toBe('blue')
    })
  })

  describe('Computed', () => {
    describe('page', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has page populated', () => {
        expect(component.vm.page).toBeDefined()
      })
    })

    // TODO: formattedPublishDate (mock moment)
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getBlogPost to the store', () => {
        component = mount(BlogPostPage, { 
          store,
          ...Setup.defaultConfiguration,
          propsData: {
            ...initialProps
          }
         })
        const expectedPath = Setup.defaultConfiguration.mocks.$route.params.urlSegment
        expect(store.dispatch).toHaveBeenCalledWith('getBlogPost', expectedPath)
      })
    })
  })
})