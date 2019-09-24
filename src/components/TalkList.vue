<template>
  <div v-if="talks.length" class="TalkList">
    <smart-link :class="'TalkListItem TalkListItem--' + talk.color + ' ' + talk.iconCssClass" v-for="talk in talks" v-bind="talk" :key="talk.id" :to="'/speaking/' + talk.urlSegment">
      <div class="TalkListItem-icon" v-html="talk.iconSvg"></div>
      <h3 class="TalkListItem-title">{{talk.title}}</h3>
      <div class="TalkListItem-moreInfo">
        Resources
      </div>
    </smart-link>
  </div>
</template>

<script>
export default {
  props: {
    talks: Array 
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
  width: 100%;
  margin: $base-spacing $small-spacing;

  @include media($min-tablet) {
    width: 45%;
  }

  @include media($min-desktop) {
    width: 30%;
  }

  > div, > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }

  &-icon {
    width: 30%;
    margin: $base-spacing 0 $small-spacing;

    @include light-svg;

  }

  &-title {
    font-size: $large-font-size;
    text-align: center;
    color: $white;
    margin: $small-spacing;
  }

  &-moreInfo {
    opacity: 0;
    transition: opacity .5s;
    font-weight: $heavy-font-weight;
    text-decoration: underline;
    color: $white;
    margin: $small-spacing 0 $base-spacing;
  }

  &:hover {
    cursor: pointer;

    .TalkListItem-moreInfo {
      opacity: 1;
      transition: opacity .5s;
    }
  }

  @include background-color;
  @include hover-saturate;

}

</style>
