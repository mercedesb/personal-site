import ContactForm from '@/components/ContactForm.vue'
import { Setup } from './Setup'
import axios from 'axios'

jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: { success: true, error: ''} }))
}))

describe('ContactForm', () => {
  let component

  const shallow = (propsData) => Setup.shallow(ContactForm, { 
    propsData: {
      ...propsData
    }
  })
  
  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow()
      expect(component.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    describe('onSubmit', () => {
      it('Calls axios.post', () => {
        component = shallow()
        component.vm.onSubmit()
          .then(result => {
            expect(axios.post).toHaveBeenCalled()
          })
      })

      it('Checks promise result', () => {
        component = shallow()
        component.vm.onSubmit()
          .then(result => {
            expect(result).toEqual({ data: { success: true, error: '' } })
          })
      })

      it('Sets component success', () => {
        component = shallow()
        component.vm.onSubmit()
          .then(result => {
            expect(component.vm.success).toEqual(true)
          })
      })

      it('Sets component error', () => {
        component = shallow()
        component.vm.onSubmit()
          .then(result => {
            expect(component.vm.error).toEqual('')
          })
      })
    })
  })
})