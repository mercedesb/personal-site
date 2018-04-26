import { shallow } from '@vue/test-utils'
import SmartLink from '@/components/SmartLink.vue'

describe('SmartLink', () => {
  describe('with an internal link', () => {
    it('matches snapshot', () => {
      const to = 'test'
      const wrapper = shallow(SmartLink, {
        propsData: { to }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('with an external link', () => {
    it('matches snapshot', () => {
      const to = 'http://google.com'
      const isExternal = true
      const wrapper = shallow(SmartLink, {
        propsData: { to, isExternal }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})