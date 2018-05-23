<template>
  <nav class="SideNav">
    <ul>
      <li>About</li>
      <li>Connect</li>
      <li>Blog</li>
      <li>Shop</li>
    </ul>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
@import '../assets/styles/variables.scss';

.SideNav {
  width: 300px;
  background-color: $brown;
  display: flex;
  flex-flow: column;
  flex:1;
}
</style>