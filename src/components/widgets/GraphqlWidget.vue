<template>
  <div class="graphql-widget">
    {{ temperature }}
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'GraphqlWidget',
  apollo: {
    temperature: gql`
      query {
        temperature {
          datetime
          tempvalue
          feelslike
          dewpoint
        }
      }
    `,
  },
};
</script>

<style lang="postcss" scoped>
.graphql-widget {
  @apply flex;
  @apply items-center;
  @apply justify-center;
  @apply bg-gray-800;
  @apply bg-opacity-60;
  @apply text-white;
  min-width: 350px;
  max-width: 350px;
}
</style>
