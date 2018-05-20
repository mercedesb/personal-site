import BlogListItem from '@/components/BlogListItem.vue'
import { TestUtility } from './TestUtility'

describe('BlogListItem', () => {
  let component

  const initialProps = {
    color: 'gray',
    featured: false,
    title: 'blog title',
    preamble: 'blog preamble',
    date: new Date('2018-04-25T00:00-05:00'),
    urlSegment: 'blog-post'
  }

  const shallow = propsData => TestUtility.shallow(BlogListItem, {
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
    it('has a color property', () => {
      component = shallow()
      expect(component.props().color).toBe('gray')
    })

    it('has a featured property', () => {
      component = shallow()
      expect(component.props().featured).toBe(false)
    })

    it('has a title property', () => {
      component = shallow()
      expect(component.props().title).toBe('blog title')
    })

    it('has a preamble property', () => {
      component = shallow()
      expect(component.props().preamble).toBe('blog preamble')
    })

    it('has a date property', () => {
      component = shallow()
      expect(component.props().date).toBeDefined()
    })

    it('has a urlSegment property', () => {
      component = shallow()
      expect(component.props().urlSegment).toBe('blog-post')
    })
  })

  describe('Computed', () => {
    describe('classes', () => {
      describe('as featured post', () => {
        it('returns with featured class', () => {
          component = shallow({featured: true})
          expect(component.vm.classes).toEqual('BlogItem BlogItem--featured')
        })
      })

      describe('with color passed in', () => {
        it('returns with color class', () => {
          component = shallow()
          expect(component.vm.classes).toEqual('BlogItem BlogItem--gray')
        })
      })
    })
  })
})
