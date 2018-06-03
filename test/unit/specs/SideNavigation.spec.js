import SideNavigation from '@/components/SideNavigation.vue'
import { TestUtility } from './TestUtility'

describe('SideNavigation', () => {
  let component

  const initialProps = {
    backgroundImages: [
      {
        file: {
          url: 'http://placeholder.pics/svg/300'
        }
      },
      {
        file: {
          url: 'http://placeholder.pics/svg/300'
        }
      },
      {
        file: {
          url: 'http://placeholder.pics/svg/300'
        }
      }
    ],
    navLinks: Object.keys(TestUtility.landingPages).map((key) => {
      return TestUtility.landingPages[key]
    })
  }

  const shallow = propsData => TestUtility.shallow(SideNavigation, {
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

  describe('Properties', () => {
    beforeEach(() => {
      component = shallow()
    })

    it('has a navLinks property', () => {
      expect(component.props().navLinks).toBe(initialProps.navLinks)
    })

    it('has a backgroundImages property', () => {
      expect(component.props().backgroundImages).toBe(initialProps.backgroundImages)
    })
  })
})
