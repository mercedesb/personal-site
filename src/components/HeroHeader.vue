<template>
  <main :class="'Hero Hero--' + color">
    <div class="Hero-background">
      <img
        v-for="image in backgroundImages"
        :src="image"
        class="Hero-backgroundImage"
      />
    </div>
    <div class="Hero-contentContainer">
      <div>
        <img class="Hero-image" :src="mainImage" />
        <parse-markdown :source="title" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    title: String,
    color: String,
    mainImage: String,
    backgroundImages: Array
  }
}
</script>

<style lang="scss">
</style>