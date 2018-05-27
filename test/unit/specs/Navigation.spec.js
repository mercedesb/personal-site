import Navigation from '@/components/Navigation.vue'
import { TestUtility } from './TestUtility'

describe('Navigation', () => {
  let component

  const state = {
    backgroundImages: [
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
    ],
    navLinks: Object.keys(TestUtility.landingPages).map((key) => {
      return TestUtility.landingPages[key]
    })
  }

  const actions = {
    getBackgroundImages: jest.fn(),
    getNavLinks: jest.fn()
  }

  const store = {
    state,
    actions
  }

  const shallow = propsData => TestUtility.shallow(Navigation, {
    store,
    propsData: {
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow()
      expect(component.element).toMatchSnapshot()
    })
  })

  describe('Computed', () => {
    describe('backgroundImages', () => {
      describe('with background images in cms', () => {
        it('has backgroundImages populated', () => {
          component = shallow()
          expect(component.vm.backgroundImages).toBeDefined()
        })
      })

      describe('without background images in cms', () => {
        it('has backgroundImages populated', () => {
          const localNavigation = {
            ...state,
            backgroundImages: undefined
          }
          const localStore = {
            state: localNavigation,
            actions
          }
          component = TestUtility.shallow(Navigation, {
            store: localStore
          })

          expect(component.vm.backgroundImages).toBeDefined()
        })
      })
    })

    describe('navLinks', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has navLinks populated', () => {
        expect(component.vm.navLinks).toBeDefined()
      })

      it('creates a parsedLink prop on the navLinks', () => {
        expect(component.vm.navLinks[0].parsedLink).toBeDefined()
      })

      it('uses the external link for parsedLink if its defined', () => {
        const shopPage = TestUtility.landingPages['shop']
        const shopLink = component.vm.navLinks.find((link) => {
          return link.title === shopPage.title
        })
        expect(shopLink.parsedLink).toEqual(shopPage.externalLink)
      })

      it('uses the url segment for parsedLink if eternalLink is not defined', () => {
        const blogPage = TestUtility.landingPages['blog']
        const blogLink = component.vm.navLinks.find((link) => {
          return link.title === blogPage.title
        })
        expect(blogLink.parsedLink).toEqual(`/${blogPage.urlSegment}`)
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getNavLinks to the store', () => {
        component = TestUtility.mount(Navigation, {
          store
        })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getNavLinks')
      })
      it('dispatches getBackgroundImages to the store', () => {
        component = TestUtility.mount(Navigation, {
          store
        })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getBackgroundImages')
      })
    })
  })
})
