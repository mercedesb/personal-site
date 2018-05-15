import PageHeader from '@/components/PageHeader.vue'
import { Setup } from './Setup'

describe('PageHeader', () => {
  let component

  const initialProps = {
    color: 'brown',
    title: 'title',
    preamble: 'heres the preamble',
    media: 'http://image.com'
  }

  const shallow = propsData => Setup.shallow(PageHeader, { 
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
        component = shallow({title: undefined})
        expect(component.element).toMatchSnapshot()
      })
    })
  })

   describe('Properties', () => {
    it('has a title property', () => {
      component = shallow()
      expect(component.props().title).toEqual('title')
    })

    it('has a color property', () => {
      component = shallow()
      expect(component.props().color).toEqual('brown')
    })

    it('has a preamble property', () => {
      component = shallow()
      expect(component.props().preamble).toEqual('heres the preamble')
    })

    it('has a media property', () => {
      component = shallow()
      expect(component.props().media).toEqual('http://image.com')
    })
  })
})