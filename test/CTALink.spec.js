import { shallowMount } from '@vue/test-utils'
import CTALink from '@/components/CTALink.vue'
import SmartLink from '@/components/SmartLink.vue'

describe('CTALink', () => {

  describe('Snapshots', () => {
    let component 

    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallowMount(CTALink, {
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
        component = shallowMount(CTALink, {
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