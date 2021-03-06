import HeroHeader from '@/components/HeroHeader.vue'
import { TestUtility } from './TestUtility'

describe('HeroHeader', () => {
  let component

  const initialProps = {
    title: 'hero title',
    'preamble': 'hero preamble',
    color: 'brown',
    mainImage: 'http://google.com',
    backgroundImages: ['http://image1.com', 'http://image2.com', 'http://image3.com']
  }

  const shallow = propsData => TestUtility.shallow(HeroHeader, {
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('renders img for each item in props.backgroundImages', () => {
      component = shallow()
      expect(component.findAll('.Hero-background img')).toHaveLength(initialProps.backgroundImages.length)
    })

    describe('with a title', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a title', () => {
      it('matches snapshot', () => {
        component = shallow({title: undefined})
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})
