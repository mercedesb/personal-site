import { shallow } from '@vue/test-utils'
import CTALink from '@/components/CTALink.vue'

describe('CTALink', () => {
  describe('Snapshots', () => {
    let component 

    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow(CTALink, {
          propsData: {
            title: 'title',
            icon: 'http://iconurl.com',
            url: 'testPath',
            color: 'blue',
            external: false
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow(CTALink, {
           propsData: {
            title: 'title',
            icon: 'http://iconurl.com',
            url: 'testPath',
            external: false
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})