import HomePage from '@/components/pages/HomePage.vue'
import { TestUtility } from './TestUtility'

describe('HomePage', () => {
  let component

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
      children: Object.keys(TestUtility.landingPages).map((key, index) => {
        return {
          sys: {
            id: `child ${index}`,
          },
          fields: {
            ...TestUtility.landingPages[key]
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

  const store = {
    state,
    actions
  }

  const shallow = propsData => TestUtility.shallow(HomePage, {
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
          const localHomePage = {
            ...state.homePage,
            backgroundImages: undefined
          }
          const localStore = {
            state: {
              homePage: localHomePage,
            },
            actions
          }
          component = TestUtility.shallow(HomePage, {
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
          const localHomePage = {
            ...state.homePage,
            children: undefined
          }
          const localStore = {
            state: {
              homePage: localHomePage,
            },
            actions
          }
          component = TestUtility.shallow(HomePage, {
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
        component = TestUtility.mount(HomePage, { 
          store
         })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getHomePage')
      })
    })
  })
})