import PageHeader from '@/components/PageHeader.vue'
import { TestUtility } from './TestUtility'

describe('PageHeader', () => {
  let component

  const initialProps = {
    color: 'brown',
    title: 'title',
    preamble: 'heres the preamble',
    media: 'http://image.com'
  }

  const shallow = propsData => TestUtility.shallow(PageHeader, {
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    describe('with a title', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a title', () => {
      it('matches snapshot', () => {
        component = shallow({ title: undefined })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('with inline svg', () => {
      it('matches snapshot', () => {
        component = shallow({ media: null, icon: '<svg><g><path /></g></svg>' })
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})
