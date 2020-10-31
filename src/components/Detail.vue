<template>
  <div v-if="restaurant">
    <div>Detail d'un restaurant qui a pour id : {{ id }}</div>
    <div>Nom : {{ restaurant.name }}</div>
    <div>Cuisine : {{ restaurant.cuisine }}</div>
    <div id="mapid" ref="mapElement"></div>
    <div>
      <div class="info" style="height: 15%, width: 15%;">
                      <span>Center: {{ center }}</span>
                      <span>Zoom: {{ zoom }}</span>
                      <span>Bounds: {{ bounds }}</span>
                    </div>
      <l-map style="height: 500px; width: 500px" :zoom = "zoom" :center = "center" @update:zoom = "zoomUpdated" @update:center = "centerUpdated" @update:bounds = "boundsUpdated">
        <l-tile-layer :url = "url" ></l-tile-layer>
        <l-marker :lat-lng = "LMarker"></l-marker>
      </l-map>
    </div>
    <v-btn>
      <router-link to="/">Retour</router-link>
    </v-btn>
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

import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
  name: "Detail",
  props: ["fav"],
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  components:{
    LMap,
    LTileLayer,
    LMarker
  },
  data: function () {
    return {
      restaurant: null, //initialiser la variable restaurant
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

      center: latLng(47.41322, -1.219482),
      bounds: null,
      zoom: 13,
      LMarker: latLng(47.41322, -1.219482),
    
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
        this.center = latLng(this.restaurant.address.coord[1],this.restaurant.address.coord[0])
        this.LMarker = this.center
      });
   
  },
  methods: {
    afficheimg() {
      let x = "";
      if (this.restaurant.cuisine == "American") {
        console.log("ameriqueeee");
        x = "america fuck yeah";
      }
      return x;
    },
     zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>


<style>
</style>