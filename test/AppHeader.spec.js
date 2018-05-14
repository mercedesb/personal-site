import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'
import Setup from './Setup'
import Vuex from 'vuex'

describe('AppHeader', () => {
  Setup.configure()

  const initialProps = {
    classModifier: 'modifier'
  }

  const actions = {
    getNavLinks: jest.fn()
  }

  const store = new Vuex.Store({
    state: {
      navLinks: Object.keys(Setup.landingPages).map((key) => {
        return Setup.landingPages[key]
      })
    },
    actions
  })

  const shallow = propsData => shallowMount(AppHeader, { 
    store,
    propsData: {
      ...initialProps,
      ...propsData
    }
   })

  describe('Snapshots', () => {
    let component 

    describe('with a classModifier passed in', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a classModifier passed in', () => {
      it('matches snapshot', () => {
        component = shallow({classModifier: ''})
        expect(component.element).toMatchSnapshot()
      })
    })
  })

  describe('Properties', () => {
    let component 

    it('has a classModifier property', () => {
      component = shallow()
      expect(component.props().classModifier).toBe('modifier')
    })
  })

  describe('Computed', () => {
    let component

    it('has navLinks populated', () => {
      component = shallow()
      expect(component.vm.navLinks).toBeDefined()
    })

    it('creates a parsedLink prop on the navLinks', () => {
      component = shallow()
      expect(component.vm.navLinks[0].parsedLink).toBeDefined()
    })

    it('uses the external link for parsedLink if its defined', () => {
      component = shallow()
      const shopPage = Setup.landingPages["shop"]
      const shopLink = component.vm.navLinks.find((link) => {
        return link.title === shopPage.title
      })
      expect(shopLink.parsedLink).toEqual(shopPage.externalLink)
    })

    it('uses the url segment for parsedLink if eternalLink is not defined', () => {
      component = shallow()
      const blogPage = Setup.landingPages["blog"]
      const blogLink = component.vm.navLinks.find((link) => {
        return link.title === blogPage.title
      })
      expect(blogLink.parsedLink).toEqual(`/${blogPage.urlSegment}`)
    })
  })
})