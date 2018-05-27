import LandingPage from '@/components/pages/LandingPage.vue'
import { TestUtility } from './TestUtility'

describe('LandingPage', () => {
  let component

  const initialProps = {
    urlSegment: 'about'
  }

  const store = {
    state: {
      landingPage: {
        ...TestUtility.landingPages[initialProps.urlSegment]
      }
    },
    actions: {
      getLandingPage: jest.fn()
    }
  }

  const shallow = propsData => TestUtility.shallow(LandingPage, {
    store,
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow()
      expect(component.element).toMatchSnapshot()
    })
  })

  describe('Properties', () => {
    it('has a urlSegment property', () => {
      component = shallow()
      expect(component.props().urlSegment).toBe('about')
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

    describe('iconUrl', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has iconUrl populated', () => {
        expect(component.vm.iconUrl).toBeDefined()
      })
    })

    describe('ctaLinks', () => {
      describe('with ctaLinks in cms', () => {
        it('has ctaLinks populated', () => {
          component = shallow()
          expect(component.vm.ctaLinks).toBeDefined()
        })

        it('creates objects of the desired shape', () => {
          component = shallow()
          const expectedShape = {
            id: expect.any(String),
            color: expect.any(String),
            title: expect.any(String),
            icon: expect.any(String),
            url: expect.any(String),
            external: expect.any(Boolean)
          }

          expect(component.vm.ctaLinks[0]).toMatchObject(expectedShape)
        })
      })

      describe('without ctaLinks in cms', () => {
        it('has ctaLinks populated', () => {
          const localPage = {
            ...store.state.landingPage,
            ctaLinks: undefined
          }
          const localStore = {
            state: {
              landingPage: localPage
            },
            actions: store.actions
          }
          component = TestUtility.shallow(LandingPage, {
            store: localStore,
            propsData: {
              ...initialProps
            }
          })

          expect(component.vm.ctaLinks).toBeDefined()
        })
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getLandingPage to the store', () => {
        component = TestUtility.mount(LandingPage, {
          store,
          propsData: {
            ...initialProps
          }
        })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getLandingPage', initialProps.urlSegment)
      })
    })
  })
})
