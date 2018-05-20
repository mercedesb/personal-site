import objects from '@/mixins/objects.js'
import { TestUtility } from './TestUtility'

describe('objects', () => {
  describe('isEmpty', () => {
    describe('with an empty object', () => {
      it('returns true', () => {
        const obj = {}
        expect(objects.methods.isEmpty(obj)).toEqual(true)
      })
    })

    describe('with a non-empty object', () => {
      it('returns false', () => {
        const obj = {
          url: 'imageUrl'
        }
        expect(objects.methods.isEmpty(obj)).toEqual(false)
      })
    })

    describe('with undefined', () => {
      it('returns true', () => {
        expect(objects.methods.isEmpty(undefined)).toEqual(true)
      })
    })

    describe('with null', () => {
      it('returns true', () => {
        expect(objects.methods.isEmpty(null)).toEqual(true)
      })
    })
  })
})