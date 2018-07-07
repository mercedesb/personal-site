import ReadingTime from '@/components/ReadingTime.vue'
import { TestUtility } from './TestUtility'

describe('ReadingTime', () => {
  let component

  const initialProps = {
    text: 'heres some text'
  }

  const shallow = propsData => TestUtility.shallow(ReadingTime, {
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow()
      expect(component.element).toMatchSnapshot()
    })
  })

  describe('Computed', () => {
    describe('words', () => {
      it('returns the number of words in the text', () => {
        component = shallow()
        expect(component.vm.words).toEqual(3)
      })
    })

    describe('minutes', () => {
      it('returns the ceiling of how long it will take to read that many words', () => {
        component = shallow()
        expect(component.vm.minutes).toEqual(1)
      })
    })
  })
})
