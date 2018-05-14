// import { shallowMount, createLocalVue } from '@vue/test-utils'
// import AppHeader from '@/components/AppHeader.vue'

// describe('AppHeader', () => {


//   const initialProps = {
//     classModifier: 'modifier'
//   }

//   const shallow = propsData => shallowMount(AppHeader, { 
//     propsData: {
//       ...initialProps,
//       ...propsData
//     }
//    })

//   describe('Snapshots', () => {
//     let component 

//     describe('with a classModifier passed in', () => {
//       it('matches snapshot', () => {
//         component = shallow()
//         expect(component.element).toMatchSnapshot()
//       })
//     })

//     describe('without a classModifier passed in', () => {
//       it('matches snapshot', () => {
//         component = shallow({classModifier: ''})
//         expect(component.element).toMatchSnapshot()
//       })
//     })
//   })

//   describe('Properties', () => {
//     let component 

//     beforeEach(() => {
//       component = shallow()
//     })

//     it('has a classModifier property', () => {
//       expect(component.props().classModifier).toBe('modifier')
//     })
//   })

//   describe('Computed', () => {
//     let component

//   })
// })