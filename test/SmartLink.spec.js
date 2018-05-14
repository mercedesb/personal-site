import { shallow } from '@vue/test-utils'
import SmartLink from '@/components/SmartLink.vue'

describe('SmartLink', () => {
  describe('Snapshots', () => {
    let component

    describe('with an internal link', () => {
      it('matches snapshot', () => {
        const to = 'test'
        component = shallow(SmartLink, {
          propsData: { to }
        })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('with an external link', () => {
      it('matches snapshot', () => {
        const to = 'http://google.com'
        const isExternal = true
        component = shallow(SmartLink, {
          propsData: { to, isExternal }
        })
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})