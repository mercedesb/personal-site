<template>
  <TalkList :talks="talks" />
</template>

<script>
import TalkList from './TalkList.vue'

export default {
  components: {
    TalkList
  },
  computed: {
    talks () {
      let toSort = this.$store.state.talks.map(talk => {
        return {
          ...talk,
          iconSvg: talk.iconSvg.fields.svg
        }
      })

      // sort in reverse chronological order based on when talk was last given
      return toSort.sort((first, second) => {
        const firstGivenAt = first.givenAt || []
        const firstMaxDate = Math.max(...firstGivenAt.map(ga => new Date(ga.fields.date)))

        const secondGivenAt = second.givenAt || []
        const secondMaxDate = Math.max(...secondGivenAt.map(ga => new Date(ga.fields.date)))

        if (firstMaxDate < secondMaxDate) return 1
        if (firstMaxDate > secondMaxDate) return -1
        return 0
      })
    }
  }
}
</script>

