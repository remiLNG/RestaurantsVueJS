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
          <router-link :to="{ name: 'favoris', params: { fav: this.favoris } }"
            >Favoris</router-link
          >
        </v-btn>
      </v-app-bar>
    </div>
    <div>
      <h1>Bienvenue au restaurant {{ restaurant.name }}</h1>
    </div>

    <div class="main">
      <v-container>
        <v-row>
          <v-col cols="4">
            <div class="emplacement">
              <v-card>
                <v-card-title class="teal accent-4">
                  <span class="headline white--text">Emplacement</span>
                </v-card-title>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <div class="map">
                        <l-map
                          style="height: 30rem;  width: 30rem;"
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
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon class="icon">fas fa-map-marker-alt </v-icon>
                          {{ restaurant.borough }},
                          {{ restaurant.address.zipcode }}
                          {{ restaurant.address.street }}, Batiment
                          {{ restaurant.address.building }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="menu">
              <v-card>
                <v-card-title class="teal accent-4">
                  <span class="headline white--text">Menu</span>
                </v-card-title>

                <v-img
                  src="../assets/menu.jpg"
                  height="200px"
                  position="center 10%"
                ></v-img>
              </v-card>
            </div>
          </v-col>
          <v-col cols="4">
            <div class="detail">
              <v-card>
                <v-card-title class="teal accent-4">
                  <span class="headline white--text">Détails</span>
                </v-card-title>

                <v-list>
                  <v-subheader> Fourchette de prix </v-subheader>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon>fas fa-coins</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        1 milliard de pognon</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <v-subheader> Cuisine</v-subheader>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon>fas fa-utensils</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{
                        restaurant.cuisine
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset></v-divider>
                  <v-subheader> Note</v-subheader>
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon>fas fa-pen</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ restaurant.grades[1].grade }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-icon small color="#32AE87">fas fa-star</v-icon>
                    <v-icon small color="#32AE87">fas fa-star</v-icon>
                    <v-icon small color="#32AE87">fas fa-star</v-icon>
                    <v-icon small color="#32AE87">fas fa-star</v-icon>
                    <v-icon small color="#32AE87">fas fa-star</v-icon>
                  </v-list-item>
                </v-list>

                <v-img src="../assets/detail.jpg" height="200px"></v-img>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
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

.main {
  background-color: lightblue;
  height: 100%;
}

.icon {
  padding: 2px;
  margin: 2px;
  transform: translate(0px, -3px);
}

.fav-btn {
  margin-left: 10px;
}


</style>