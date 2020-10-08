<template>
  <v-app>
    <v-main>
      <ListeDesRestaurants />
    </v-main>
  </v-app>
</template>

<script>
import ListeDesRestaurants from "./components/ListeDesRestaurants";

export default {
  name: "App",

  components: {
    ListeDesRestaurants,
  },

  data: () => ({
    //
  }),
};
</script>
