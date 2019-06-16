export default {
  methods: {
    isEmpty (obj) {
      if (obj === undefined || obj === null) {
        return true
      }
      return Object.keys(obj).length === 0 && obj.constructor === Object
    }
  }
}
