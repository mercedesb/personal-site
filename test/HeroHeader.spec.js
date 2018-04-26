import { shallow } from '@vue/test-utils'
import HeroHeader from '@/components/HeroHeader.vue'

describe('HeroHeader', () => {
  it('renders img for each item in props.backgroundImages', () => {
    const backgroundImages = ['http://image1.com', 'http://image2.com', 'http://image3.com']
    const wrapper = shallow(HeroHeader, {
       propsData: {
        color: 'brown',
        title: 'title',
        mainImage: 'http://image.com',
        backgroundImages: backgroundImages
      }
    })
    expect(wrapper.findAll('.Hero-background img')).toHaveLength(backgroundImages.length)
  })

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