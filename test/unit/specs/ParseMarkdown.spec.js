import ParseMarkdown from '@/components/ParseMarkdown.vue'
import { TestUtility } from './TestUtility'

const mockRender = jest.fn(() => '<h3>here is the source md</h3><p>trying it out</p>')

jest.mock('markdown-it', () => () => ({
  render: mockRender
}))

describe('ParseMarkdown', () => {
  let component

  const initialProps = {
    source: '### here is the source md\ntrying it out',
    collapsible: true,
    collapsibleTag: 'h3',
    collapsedByDefault: true
  }

  const shallow = (propsData) => TestUtility.shallow(ParseMarkdown, {
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
    describe('querySelector', () => {
      it('returns Markdown and the collapsibleTag', () => {
        component = shallow()
        expect(component.vm.querySelector).toEqual('.Markdown h3')
      })
    })

    describe('html', () => {
      describe('with source', () => {
        it('returns html markup', () => {
          component = shallow()
          expect(component.vm.html).toEqual('<h3>here is the source md</h3><p>trying it out</p>')
        })
      })

      describe('without source', () => {
        it('returns the empty string', () => {
          component = shallow({source: undefined})
          expect(component.vm.html).toEqual('')
        })
      })
    })
  })

  describe('Lifecyle', () => {
    describe('mounted', () => {
      // TODO: setMethods isn't working...

      // it('adds event listeners', () => {
      //   component = TestUtility.mount(ParseMarkdown, {
      //     propsData: {
      //       ...initialProps
      //     },
      //     attachToDocument: true
      //   })
      //   const handleCollapsible = jest.fn()
      //   component.setMethods({ handleCollapsible: handleCollapsible })
      //   component.find('h3').trigger('click')
      //   expect(handleCollapsible).toHaveBeenCalled()
      // })
    })
  })

  describe('Methods', () => {
    describe('toggleClass', () => {
      let el, selector, modifier
      describe('with a selector and modifier', () => {
        it('appends both to class name', () => {
          el = { className: '' }
          selector = 'Collapsible'
          modifier = '--collapsed'
          component = shallow()
          component.vm.toggleClass(el, selector, modifier)
          expect(el.className).toEqual(' Collapsible Collapsible--collapsed')
        })
      })

      describe('without a selector or modifier', () => {
        it('does not append to class name', () => {
          el = { className: ' Collapsible Collapsible--collapsed' }
          selector = 'Collapsible'

          component = shallow()
          component.vm.toggleClass(el, selector)
          expect(el.className).toEqual(' Collapsible Collapsible--expanded')
        })

        describe('currently collapsed', () => {
          it('replaces collapsed modifier with expanded modifier', () => {
            el = { className: ' Collapsible Collapsible--collapsed' }
            selector = 'Collapsible'

            component = shallow()
            component.vm.toggleClass(el, selector)
            expect(el.className).toEqual(' Collapsible Collapsible--expanded')
          })
        })

        describe('currently expanded', () => {
          it('replaces expanded modifier with collapsed modifier', () => {
            el = { className: ' Collapsible Collapsible--expanded' }
            selector = 'Collapsible'

            component = shallow()
            component.vm.toggleClass(el, selector)
            expect(el.className).toEqual(' Collapsible Collapsible--collapsed')
          })
        })
      })
    })
  })
})
