import TalkList from '@/components/TalkList.vue'
import { TestUtility } from './TestUtility'

describe('TalkList', () => {
  let component

  const store = {
    state: {
      talks: TestUtility.talks
    }
  }

  const shallow = propsData => TestUtility.shallow(TalkList, {
    store,
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

  describe('Computed', () => {
    describe('talks', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has talks populated', () => {
        expect(component.vm.talks).toBeDefined()
      })

      it('sorts the talks in desc order by the most recent talk given', () => {
        expect(component.vm.talks).toEqual([TestUtility.talks[1], TestUtility.talks[0], TestUtility.talks[2]])
      })
    })
  })
})
