import { shallow } from '@vue/test-utils'
import PageHeader from '@/components/PageHeader.vue'

describe('PageHeader', () => {
  describe('Snapshots', () => {
    let component

    describe('with a title', () => {
      it('matches snapshot', () => {
        component = shallow(PageHeader, {
          propsData: {
            color: 'brown',
            title: 'title',
            preamble: 'heres the preamble',
            media: 'http://image.com'
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a title', () => {
      it('matches snapshot', () => {
        component = shallow(PageHeader, {
          propsData: {
            color: 'brown',
            preamble: 'heres the preamble',
            media: 'http://image.com'
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })
    
  })
})