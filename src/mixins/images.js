export default {
  methods: {
    getImageUrl(image) {
      if (image && image.fields && image.fields.file) {
        return image.fields.file.url
      }
      return ''
    }
  }
};