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
    <div class="title">
      <h1>Bienvenue au restaurant</h1>
      <h2>{{ restaurant.name }}</h2>
      <v-dialog :retain-focus="false" v-model="addFav" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="favoris.includes(restaurant)"
            @click="ajoutFavoris(restaurant)"
            v-bind="attrs"
            v-on="on"
            type="submit"
          >
           Ajouter aux favoris
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="justify-center"
            >Restaurant ajouté à vos favoris !</v-card-title
          >
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="addFav = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <div class="main">
      <v-container>
        <v-row>
          <v-col cols="4">
            <div class="emplacement">
              <v-card>
                <v-card-title class="cyan lighten-3 justify-center">
                  <span class="headline white--text">Emplacement</span>
                </v-card-title>

                <v-list>
                  <v-list-item>
                    <v-list-item-action>
                      <div class="map">
                        <l-map
                          style="height: 30rem; width: 33.5rem"
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
                <v-card-title class="cyan lighten-3 justify-center">
                  <span class="headline white--text">Menu</span>
                </v-card-title>

                <div class="entrees"><p>~ Entree ~</p></div>
                <p id="nom">{{ entree[0].nom }}</p>
                <p id="desc">{{ entree[0].description }}</p>
                <p>{{ entree[0].prix }} €</p>

                <div class="plats"><p>~ Plat ~</p></div>
                <p id="nom">{{ plat[0].nom }}</p>
                <p id="desc">{{ plat[0].description }}</p>
                <p>{{ plat[0].prix }} €</p>

                <div class="desserts"><p>~ Dessert ~</p></div>
                <p id="nom">{{ dessert[0].nom }}</p>
                <p id="desc">{{ dessert[0].description }}</p>
                <p>{{ dessert[0].prix }} €</p>
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
                <v-card-title class="cyan lighten-3 justify-center">
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
                        {{ this.min }} € - {{ this.max }} €
                      </v-list-item-title>
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
import ListMenu from "./data.json";

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
      menu: ListMenu,
      entree: [],
      plat: [],
      dessert: [],
      max: null,
      min: null,
      addFav: false,
      favoris: [],
    };
  },
  mounted() {
    this.creerMenu();
    this.prixMax();
    this.prixMin();
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
     ajoutFavoris(rid) {
      if(!this.favoris.includes(rid)){
        this.favoris.push(rid);
      }
      console.log(this.favoris);
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
    prixMin() {
      this.min = this.entree[0].prix;
      if (this.plat[0].prix < this.min) {
        this.min = this.plat[0].prix;
      }
      if (this.dessert[0].prix < this.min) {
        this.min = this.dessert[0].prix;
      }
    },
    prixMax() {
      this.max = this.entree[0].prix;
      if (this.plat[0].prix > this.max) {
        this.max = this.plat[0].prix;
      }
      if (this.dessert[0].prix > this.max) {
        this.max = this.dessert[0].prix;
      }
    },

    creerMenu() {
      this.entree.push(
        this.menu.entrée[Math.floor(Math.random() * this.menu.entrée.length)]
      );
      this.plat.push(
        this.menu.plat[Math.floor(Math.random() * this.menu.plat.length)]
      );
      this.dessert.push(
        this.menu.dessert[Math.floor(Math.random() * this.menu.dessert.length)]
      );
    },
  },
};
</script>


<style>
div {
  font-family: Arial, Tahoma, Bitstream Vera Sans, sans-serif;
}

.title {
  font-style: italic;
  margin: 1%;
}

h1 {
  margin-top: 20px;
  color: #9bc9e0;
  font-size: 300%;
}

h2 {
  font-size: 200%;
  margin-bottom: 10px;
  margin: 20px;
}

.main {
  background: linear-gradient(#faf1ed, #9bc9e0);
}

.icon {
  padding: 2px;
  margin: 2px;
  transform: translate(0px, -3px);
}

.fav-btn {
  margin-left: 10px;
}

.entrees,
.plats,
.desserts {
  color: #32ae87;
  font-size: 20px;
}
#nom {
  font-weight: bold;
}

#desc {
  font-style: oblique 90deg;
}
</style>