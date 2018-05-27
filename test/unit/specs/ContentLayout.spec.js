import ContentLayout from '@/components/ContentLayout.vue'
import { TestUtility } from './TestUtility'

describe('ContentLayout', () => {
  let component

  const initialProps = {
    color: 'brown',
    title: 'title',
    preamble: 'heres the preamble',
    media: 'http://image.com'
  }

  const shallow = propsData => TestUtility.shallow(ContentLayout, {
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
