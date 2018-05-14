import { shallow } from '@vue/test-utils'
import ContentColumn from '@/components/ContentColumn.vue'

describe('ContentColumn', () => {
  describe('Snapshots', () => {
    let component 

    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow(ContentColumn, {
          propsData: {
            title: 'title',
            color: 'blue',
            preamble: 'test preamble',
            icon: 'http://placeholder.pics/svg/300',
            externalLink: '',
            urlSegment: 'testPath'
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow(ContentColumn, {
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

  describe('Properties', () => {

  })
})