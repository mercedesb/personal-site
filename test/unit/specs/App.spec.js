import App from '@/App.vue'
import { TestUtility } from './TestUtility'

describe('App', () => {
  let component

  const shallow = propsData => TestUtility.shallow(App, {
    propsData: {
      ...propsData
    }
  })

  describe('Snapshots', () => {
    it('matches snapshot', () => {
      component = shallow({classModifier: undefined})
      expect(component.element).toMatchSnapshot()
    })
  })
})
