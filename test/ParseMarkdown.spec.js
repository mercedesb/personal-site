import ParseMarkdown from '@/components/ParseMarkdown.vue'
import Setup from './Setup'

describe('ParseMarkdown', () => {
  let component

  Setup.configure()

  const initialProps = {
    source: '### here is the source md\ntrying it out',
    collapsible: true,
    collapsibleTag: 'h3',
    collapsedByDefault: true
  }

  const shallow = (propsData, mocks) => Setup.shallow(ParseMarkdown, { 
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
    it('has a source property', () => {
      component = shallow()
      expect(component.props().source).toEqual(initialProps.source)
    })

    it('has a collapsible property', () => {
      component = shallow()
      expect(component.props().collapsible).toEqual(true)
    })

    it('has a collapsibleTag property', () => {
      component = shallow()
      expect(component.props().collapsibleTag).toEqual('h3')
    })

    it('has a collapsedByDefault property', () => {
      component = shallow()
      expect(component.props().collapsedByDefault).toEqual(true)
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
      // TODO
      // describe('with source', () => {
      //   it('returns html markup', () => {

      //   })
      // })

      describe('without source', () => {
        it('returns the empty string', () => {
          component = shallow({source: undefined})
          expect(component.vm.html).toEqual('')
        })
      })
    })
  })

// TODO
  // describe('Lifecyle', () => {
  //   describe('mounted', () => {
  //     it('adds event listeners', () => {

  //     })

  //     describe('when collapsed by default', () => {
  //       it('calls handleCollapsible with collapsed modifier', () => {
  //         component = shallow()
  //       })
  //     })

  //     describe('when expanded by default', () => {
  //       it('calls handleCollapsible with expanded modifier', () => {
  //         component = shallow({collapsedByDefault: false})
  //       })
  //     })
  //   })
  // })

  // describe('Methods', () => {
  //   describe('handleCollapsible', () => {

  //   })

  //   describe('toggleClass', () => {

  //   })
  // })
})