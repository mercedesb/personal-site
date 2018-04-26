import { shallow } from '@vue/test-utils'
import CTALink from '@/components/CTALink.vue'

describe('CTALink', () => {
  describe('with a color passed in', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(CTALink, {
        propsData: {
          title: 'title',
          icon: 'http://iconurl.com',
          url: 'testPath',
          color: 'blue',
          external: false
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('without a color passed in', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(CTALink, {
         propsData: {
          title: 'title',
          icon: 'http://iconurl.com',
          url: 'testPath',
          external: false
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})