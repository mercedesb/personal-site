import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import LandingPage from '@/components/pages/LandingPage.vue'
import Setup from './Setup'
import Vuex from 'vuex'

describe('LandingPage', () => {
  let component

  Setup.configure()

  const initialProps = {
    urlSegment: 'about'
  }

  const state = {
    landingPage: {
      ...Setup.landingPages[initialProps.urlSegment]
    }
  }

  const actions = {
    getLandingPage: jest.fn()
  }

  const store = new Vuex.Store({
    state,
    actions
  })
  store.dispatch = jest.fn()

  const shallow = propsData => Setup.shallow(LandingPage, {
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
            ...state.landingPage,
            ctaLinks: undefined
          }
          const localStore = new Vuex.Store({
            state: {
              landingPage: localPage,
            },
            actions
          })
          component = Setup.shallow(LandingPage, {
            store: localStore
          }) 

          expect(component.vm.ctaLinks).toBeDefined()
        })
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getLandingPage to the store', () => {
        component = mount(LandingPage, { 
          store,
          ...Setup.defaultConfiguration,
         })
        expect(store.dispatch).toHaveBeenCalledWith('getLandingPage', initialProps.urlSegment)
      })
    })
  })
})