import ContentColumn from '@/components/ContentColumn.vue'
import { TestUtility } from './TestUtility'

describe('ContentColumn', () => {
  let component

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

  const shallow = propsData => TestUtility.shallow(ContentColumn, {
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

  describe('Computed', () => {
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
