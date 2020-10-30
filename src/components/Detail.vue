<template>
  <div v-if="restaurant">
     <div class="toolbar">
      <v-app-bar color="white" dense flat>
        <v-btn>
          <router-link
            :to="{ name: 'ListeDesRestaurants', params: { fav1: fav } }"
            >Retour</router-link
          >
        </v-btn>
      </v-app-bar>
    </div>
    <div>Detail d'un restaurant qui a pour id : {{ id }}</div>
    <div>Nom : {{ restaurant.name }}</div>
    <div>Cuisine : {{ restaurant.cuisine }}</div>
    <div>{{afficheimg()}}</div>

    <v-footer color="#FAF1ED">
      <v-col class="text-center">
        <p>
          Projet Buffa - Fabre-Sauterey Guilhem - Longin Rémi -
          {{ new Date().getFullYear() }}
        </p>
      </v-col>
    </v-footer> 
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["fav"],
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  data: function () {
    return {
      restaurant: null, //initialiser la variable restaurant
    };
  },
  mounted() {
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.restaurant = data.restaurant;
      });
  },
  methods: {
    afficheimg(){
      let x = ""
      if(this.restaurant.cuisine == 'American'){
        console.log("ameriqueeee"); 
        x = "america fuck yeah" //mdrr
      }
      return x
    }
  },
};
</script>


<style>
</style>