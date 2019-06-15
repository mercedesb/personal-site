import HomeLayout from '@/components/HomeLayout.vue'
import { TestUtility } from './TestUtility'

describe('HomeLayout', () => {
  let component

  const initialProps = {
    color: 'brown',
    title: 'title',
    preamble: 'heres the preamble',
    media: 'http://image.com'
  }

  const shallow = propsData => TestUtility.shallow(HomeLayout, {
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow()
      expect(component.element).toMatchSnapshot()
    })
  })
})
