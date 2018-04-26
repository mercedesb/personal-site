import { shallow } from '@vue/test-utils'
import HeroHeader from '@/components/HeroHeader.vue'

describe('HeroHeader', () => {
  describe('with a title', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(HeroHeader, {
        propsData: {
          color: 'brown',
          title: 'title',
          mainImage: 'http://image.com',
          backgroundImages: ['http://image1.com', 'http://image2.com', 'http://image3.com']
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('without a title', () => {
    it('matches snapshot', () => {
      const wrapper = shallow(HeroHeader, {
        propsData: {
          color: 'brown',
          media: 'http://image.com',
          backgroundImages: ['http://image1.com', 'http://image2.com', 'http://image3.com']
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})