<template>
  <div id="app">
    <div class="wrapper">
      <div class="background" />
      <div class="content">
        <Home />
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';

export default {
  components: {
    Home,
  },
};
</script>

<style lang="postcss">
body {
  @apply m-0;
}

.background {
  @apply fixed;
  @apply z-0;
  width: 100%;
  height: 100%;
  background-image: url("/HalleyAchtergrond.jpg");
  @apply bg-cover;
}

.content {
  @apply fixed;
  margin: 0 auto;
  min-width: 985px;
  @apply z-10;
  left: 50%;
  transform: translateX(-50%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
