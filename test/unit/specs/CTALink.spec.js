import CTALink from '@/components/CTALink.vue'
import { TestUtility } from './TestUtility'

describe('CTALink', () => {
  let component

  const initialProps = {
    title: 'cta title',
    icon: 'http://google.com',
    url: 'cta',
    color: 'gray',
    external: false
  }

  const shallow = propsData => TestUtility.shallow(CTALink, {
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
    describe('modifierClass', () => {
      it('returns default if not external', () => {
        component = shallow()
        expect(component.vm.modifierClass).toEqual('default')
      })

      it('returns external if external', () => {
        component = shallow({external: true})
        expect(component.vm.modifierClass).toEqual('external')
      })
    })
  })
})
