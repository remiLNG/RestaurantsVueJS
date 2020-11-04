<template>
  <div v-if="restaurant">
    <div class="toolbar">
      <v-app-bar color="#FAF1ED" dense flat>
        <v-btn>
          <router-link
            :to="{ name: 'ListeDesRestaurants', params: { fav1: fav } }"
            >Retour</router-link
          >
        </v-btn>
         <v-btn class="fav-btn">
        <router-link :to="{name: 'favoris',params:{fav: this.favoris}}">Favoris</router-link>
      </v-btn>
      </v-app-bar>
    </div>
    <!-- <div>Detail d'un restaurant qui a pour id : {{ id }}</div> -->
    <div>
      <h1>Bienvenue au restaurant : {{ restaurant.name }}</h1>
    </div>
   
    <div class="main">

    <div class="emplacement">
      <div class="titles">
        <h3>Emplacement et coordonnées</h3>
      </div>
      <div class="map">
        <!-- <div class="info" style="height: 15%, width: 15%;">
                      <span>Center: {{ center }}</span>
                      <span>Zoom: {{ zoom }}</span>
                      <span>Bounds: {{ bounds }}</span>
                    </div> -->
        <l-map
          style="height: 400px; width: 400px; margin: auto"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="LMarker"></l-marker>
        </l-map>
      </div>
      <v-icon class="icon" dense color="red">fas fa-map-marker-alt </v-icon>
      {{ restaurant.borough }}, {{ restaurant.address.zipcode }}
      {{ restaurant.address.street }}, Batiment
      {{ restaurant.address.building }}
    </div>
    <div class="detail">
      <h3>Detail</h3>
      <div class="detail-content">
         Cuisine : {{ restaurant.cuisine }}
          <br>
         Note : {{restaurant.grades[1].grade}}
      </div>
    </div>
    <div class="menu">
      <h3>Menu</h3>
      <div class="menu-content"></div>
    </div>
      </div>
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
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Detail",
  props: ["fav"],
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
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
        this.center = latLng(
          this.restaurant.address.coord[1],
          this.restaurant.address.coord[0]
        );
        this.LMarker = this.center;
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
div {
  font-family: Arial, Tahoma, Bitstream Vera Sans, sans-serif;
}

.main{
  background-color: lightblue;
}

.icon {
  padding: 2px;
  margin: 2px;
  transform: translate(0px, -3px);
}
.emplacement {
  margin: 20px;
}
.map {
  padding: 5px;
  margin: 10px;
}

.detail-content {
  background-color: white;
  height: 400px;
  width: 400px;
  margin: auto;
}

.menu-content {
  background-color: white;
  height: 400px;
  width: 400px;
  margin: auto;

}

.fav-btn{
  margin-left: 10px;
}
</style>