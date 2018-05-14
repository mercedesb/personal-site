import { shallowMount } from '@vue/test-utils'
import PageHeader from '@/components/PageHeader.vue'
import Setup from './Setup'

describe('PageHeader', () => {
  Setup.configure()
  
  describe('Snapshots', () => {
    let component

    describe('with a title', () => {
      it('matches snapshot', () => {
        component = shallowMount(PageHeader, {
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
        component = shallowMount(PageHeader, {
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