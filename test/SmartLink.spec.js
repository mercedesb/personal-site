import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import SmartLink from '@/components/SmartLink.vue'
import Setup from './Setup'

describe('SmartLink', () => {
  Setup.configure()
  
  describe('Snapshots', () => {
    let component

    describe('with an internal link', () => {
      it('matches snapshot', () => {
        const to = 'test'
        component = shallowMount(SmartLink, {
          propsData: { to },
          stubs: {
            RouterLink: RouterLinkStub
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('with an external link', () => {
      it('matches snapshot', () => {
        const to = 'http://google.com'
        const isExternal = true
        component = shallowMount(SmartLink, {
          propsData: { to, isExternal },
          stubs: {
            RouterLink: RouterLinkStub
          }
        })
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})