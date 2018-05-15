import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import HomePage from '@/components/pages/HomePage.vue'
import Setup from './Setup'
import Vuex from 'vuex'

describe('HomePage', () => {
  let component

  Setup.configure()

  const state = {
    homePage: {
      id: 'homepage',
      preamble: 'here is the dev homepage preamble, it\'s a little long to be more realistic',
      mainImage: {
        fields: {
          file: {
            url: 'http://placeholder.pics/svg/300'
          }
        }
      },
      children: Object.keys(Setup.landingPages).map((key, index) => {
        return {
          sys: {
            id: `child ${index}`,
          },
          fields: {
            ...Setup.landingPages[key]
          }
        }
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
  }

  const actions = {
    getHomePage: jest.fn()
  }

  const store = new Vuex.Store({
    state,
    actions
  })
  store.dispatch = jest.fn()

  const shallow = propsData => Setup.shallow(HomePage, {
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
    describe('page', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has page populated', () => {
        expect(component.vm.page).toBeDefined()
      })
    })

    describe('mainImageUrl', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has mainImageUrl populated', () => {
        expect(component.vm.mainImageUrl).toBeDefined()
      })
    })

    describe('backgroundImages', () => {
      describe('with background images in cms', () => {
        it('has backgroundImages populated', () => {
          component = shallow()
          expect(component.vm.backgroundImages).toBeDefined()
        })
      })

      describe('without background images in cms', () => {
        it('has backgroundImages populated', () => {
          const localState = {
            ...state,
            backgroundImages: undefined
          }
          const localStore = new Vuex.Store({
            state: localState,
            actions
          })
          component = Setup.shallow(HomePage, {
            store: localStore
          }) 

          expect(component.vm.backgroundImages).toBeDefined()
        })
      })
    })

    describe('columns', () => {
      describe('with children in cms', () => {
        it('has columns populated', () => {
          component = shallow()
          expect(component.vm.columns).toBeDefined()
        })

        it('creates objects of the desired shape', () => {
          component = shallow()
          const expectedShape = {
            id: expect.any(String),
            title: expect.any(String),
            color: expect.any(String),
            preamble: expect.any(String),
            icon: expect.any(Object),
            externalLink: expect.any(String),
            urlSegment: expect.any(String)
          }

          expect(component.vm.columns[0]).toMatchObject(expectedShape)
        })
      })

      describe('without children in cms', () => {
        it('has columns populated', () => {
          const localState = {
            ...state,
            children: undefined
          }
          const localStore = new Vuex.Store({
            state: localState,
            actions
          })
          component = Setup.shallow(HomePage, {
            store: localStore
          }) 

          expect(component.vm.columns).toBeDefined()
        })
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getHomePage to the store', () => {
        component = mount(HomePage, { 
          store,
          ...Setup.defaultConfiguration,
         })
        expect(store.dispatch).toHaveBeenCalledWith('getHomePage')
      })
    })
  })
})