import SmartLink from '@/components/SmartLink.vue'
import { Setup } from './Setup'

describe('SmartLink', () => {
  let component 

  const shallow = propsData => Setup.shallow(SmartLink, {
    propsData: {
      ...propsData
    }
  }) 
  
  describe('Snapshots', () => {
    describe('with an internal link', () => {
      it('matches snapshot', () => {
        const to = 'test'
        component = shallow({ to })
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('with an external link', () => {
      it('matches snapshot', () => {
        const to = 'http://google.com'
        const isExternal = true
        component = shallow({ to, isExternal })
        expect(component.element).toMatchSnapshot()
      })
    })
  })
})