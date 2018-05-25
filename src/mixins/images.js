export default {
  methods: {
    getImageUrl (image) {
      if (image && image.fields && image.fields.file) {
        return image.fields.file.url
      }
      else if (image && image.file) {
        return image.file.url
      }
      else {
        return ''
      }
    }
  }
}
