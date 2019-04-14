<template>
  <div v-if="talks.length" class="TalkList">
    <smart-link class="TalkListItem TalkListItem--purple draw" v-for="talk in talks" v-bind="talk" :key="talk.id" :to="talk.urlSegment">
      <div v-html="talk.icon"></div>
      <h3 class="TalkListItem-title">{{talk.title}}</h3>
    </smart-link>
  </div>
</template>

<script>
export default {
  computed: {
    talks () {
      return this.$store.state.talks.map(talk => {
        return {
          id: talk.id,
          title: talk.title,
          preamble: talk.preamble,
          mainContent: talk.mainContent,
          urlSegment: talk.urlSegment,
          icon: talk.icon
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.TalkList {
  display: flex;
}

.TalkListItem {
  max-width: 400px;
  margin: $base-spacing;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: $base-spacing;

  &:hover {
    cursor: pointer;
  }

  @include background-color;
  @include hover-saturate;

  &-title {
    font-size: $large-font-size;
    text-align: center;
  }
}

</style>
