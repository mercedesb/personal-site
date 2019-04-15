<template>
  <div v-if="talks.length" class="TalkList">
    <smart-link :class="'TalkListItem draw TalkListItem--' + talk.color" v-for="talk in talks" v-bind="talk" :key="talk.id" :to="'speaking/' + talk.urlSegment">
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
          color: talk.color,
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
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.TalkListItem {
  width: 400px;
  height: 400px;
  margin: $base-spacing;
  padding: $base-spacing;

  > div, > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  &:hover {
    cursor: pointer;
  }

  @include background-color;
  @include hover-saturate;

  &-title {
    font-size: $large-font-size;
    text-align: center;
    color: $white;
  }
}

</style>
