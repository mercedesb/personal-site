import { shallow } from '@vue/test-utils'
import PageHeader from '@/components/PageHeader.vue'

describe('PageHeader', () => {
  describe('with a title', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(PageHeader, {
        propsData: {
          color: 'brown',
          title: 'title',
          preamble: 'heres the preamble',
          media: 'http://image.com'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('without a title', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(PageHeader, {
        propsData: {
          color: 'brown',
          preamble: 'heres the preamble',
          media: 'http://image.com'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})