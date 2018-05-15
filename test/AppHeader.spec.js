import AppHeader from '@/components/AppHeader.vue'
import { Setup } from './Setup'

describe('AppHeader', () => {
  let component

  const initialProps = {
    classModifier: 'modifier'
  }
  const store = {
    state: {
      navLinks: Object.keys(Setup.landingPages).map((key) => {
        return Setup.landingPages[key]
      })
    },
    actions: {
      getNavLinks: jest.fn()
    }
  }

  const shallow = propsData => Setup.shallow(AppHeader, { 
    store,
    propsData: {
      ...initialProps,
      ...propsData
    }
   })

  describe('Snapshots', () => {
    describe('with a classModifier passed in', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a classModifier passed in', () => {
      it('matches snapshot', () => {
        component = shallow({classModifier: undefined})
        expect(component.element).toMatchSnapshot()
      })
    })
  })

  describe('Properties', () => {
    it('has a classModifier property', () => {
      component = shallow()
      expect(component.props().classModifier).toBe('modifier')
    })
  })

  describe('Computed', () => {
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
        const shopPage = Setup.landingPages["shop"]
        const shopLink = component.vm.navLinks.find((link) => {
          return link.title === shopPage.title
        })
        expect(shopLink.parsedLink).toEqual(shopPage.externalLink)
      })

      it('uses the url segment for parsedLink if eternalLink is not defined', () => {
        const blogPage = Setup.landingPages["blog"]
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
        component = Setup.mount(AppHeader, { 
          store,
          propsData: {
            ...initialProps
          }
         })
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getNavLinks')
      })
    })
  })
})