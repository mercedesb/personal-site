import { shallowMount, mount } from '@vue/test-utils'
import ContentColumn from '@/components/ContentColumn.vue'

describe('ContentColumn', () => {
  const initialProps = {
    title: 'title',
    color: 'blue',
    preamble: 'test preamble',
    icon: {
      fields: {
        file: {
          url: 'http://placeholder.pics/svg/300'
        }
      }
    },
    externalLink: '',
    urlSegment: 'testPath'
  }

  const shallow = propsData => shallowMount(ContentColumn, { 
    propsData: {
      ...initialProps,
      ...propsData
    }
   })

  const deep = propsData => mount(ContentColumn, {
    propsData: {
      ...initialProps,
      ...propsData
    }
  })


  describe('Snapshots', () => {
    let component 

    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow({color: ''})
        expect(component.element).toMatchSnapshot()
      })
    })
  })

  describe('Properties', () => {
    let component 

    beforeEach(() => {
      component = deep()
    })

    it('has a title property', () => {
      expect(component.props().title).toBe('title')
    })

    it('has a preamble property', () => {
      expect(component.props().preamble).toBe('test preamble')
    })

    it('has a color property', () => {
      expect(component.props().color).toBe('blue')
    })

    it('has a icon property', () => {
      expect(component.props().icon).toBeDefined()
    })

    it('has a urlSegment property', () => {
      expect(component.props().urlSegment).toBe('testPath')
    })
  })

  describe('Computed', () => {
    let component

    describe('isExternal', () => {
      it('returns true if externalLink prop is defined', () => {
        component = shallow({externalLink: 'http://google.com'})
        expect(component.vm.isExternal).toBe(true)
      })

      it('returns false if externalLink prop is not defined', () => {
        component = shallow()
        expect(component.vm.isExternal).toBe(false)
      })
    })

    describe('link', () => {
      let component

      it('returns externalLink from prop if defined', () => {
        component = shallow({externalLink: 'http://google.com'})
        expect(component.vm.link).toBe('http://google.com')
      })

      it('returns urlSegment if externalLink does not exist', () => {
        component = shallow()
        expect(component.vm.link).toBe('testPath')
      })
    })
  })
})