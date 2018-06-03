import BlogPostPage from '@/components/pages/BlogPostPage.vue'
import { TestUtility } from './TestUtility'

const mockFormat = jest.fn(() => 'Apr 18 2018')

jest.mock('moment', () => () => ({
  format: mockFormat
}))

describe('BlogPostPage', () => {
  let component

  const initialProps = {
    color: 'blue'
  }

  const store = {
    state: {
      blogPost: TestUtility.blogPosts[0],
      navLinks: []
    }
  }

  const shallow = propsData => TestUtility.shallow(BlogPostPage, {
    store,
    propsData: {
      ...initialProps,
      ...propsData
    }
  })

  describe('Snapshots', () => {
    describe('with a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow()
        expect(component.element).toMatchSnapshot()
      })
    })

    describe('without a color passed in', () => {
      it('matches snapshot', () => {
        component = shallow({color: undefined})
        expect(component.element).toMatchSnapshot()
      })
    })
  })

  describe('Computed', () => {
    describe('page', () => {
      beforeEach(() => {
        component = shallow()
      })

      it('has page populated', () => {
        expect(component.vm.page).toBeDefined()
      })
    })

    describe('formattedPublishDate', () => {
      it('calls moment().format', () => {
        component = shallow()
        expect(mockFormat).toHaveBeenCalled()
      })
    })
  })

  describe('Lifecycle', () => {
    describe('created', () => {
      it('dispatches getBlogPost to the store', () => {
        component = TestUtility.mount(BlogPostPage, {
          store,
          propsData: {
            ...initialProps
          }
        })
        const expectedPath = TestUtility.mockRoute
        expect(component.vm.$store.dispatch).toHaveBeenCalledWith('getBlogPost', expectedPath)
      })
    })
  })
})
