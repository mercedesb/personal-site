import images from '@/mixins/images.js'
import { TestUtility } from './TestUtility'

describe('images', () => {
  describe('getImageUrl', () => {
    describe('with expected object shape', () => {
      it('returns image url', () => {
        const image = {
          fields: {
            file: {
              url: 'imageUrl'
            }
          }
        }
        expect(images.methods.getImageUrl(image)).toEqual('imageUrl')
      })
    })

    describe('with unexpected object shape', () => {
      it('returns empty string', () => {
        const image = {
          url: 'imageUrl'
        }
        expect(images.methods.getImageUrl(image)).toEqual('')
      })
    })
  })
})