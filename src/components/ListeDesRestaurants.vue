<template>
  <div>
    <div class="home_img">
      <h1 class="h1title">Liste des Restaurants</h1>
    </div>

    <p class="nom">
      <input
        class="searchByNom"
        @input="chercherRestaurants()"
        placeholder="Recherche par nom"
        type="text"
        v-model="nomRestauRecherche"
      />
    </p>
    <p class="cuisine">
      <input
        class="searchByCuisine"
        @input="chercherCuisines()"
        placeholder="Recherche par cuisine"
        type="text"
        v-model="nomCuisineRecherche"
      />
    </p>
    <p>Nombre de restaurants : {{ nbRestaurantsTotal }}</p>
    <p>Nb de pages total : {{ nbPagesTotal }}</p>
    <p>
      Nb restaurants par page :
      <input
        @input="getRestaurantsFromServer()"
        type="range"
        min="1"
        max="10"
        v-model="pagesize"
      />
    </p>
    <br />
    <v-simple-table>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
        <th>Details</th>
        <th></th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          :key="index"
          :style="{ backgroundColor: getColor(index) }"
          :class="{ bordureRouge: index === 2 }"
        >
          <td>{{ r.name }}</td>
          <td>{{ r.cuisine }}</td>
          <td>
            <v-dialog
              :retain-focus="false"
              v-model="dialoginfo"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="
                    setCourant(r.name);
                    dialoginfo = true;
                  "
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon transparent> fas fa-info-circle </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  Bienvenue sur la page du restaurant : {{ selectedName }}
                </v-card-title>
                <v-card-actions>
                  <v-btn text @click="dialoginfo = false"> Fermer </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </td>
          <td>
            <v-dialog
              :retain-focus="false"
              v-model="dialogtrash"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="setIDcourant(r._id)"
                  class="btn-trash"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon> far fa-trash-alt </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="justify-center">
                  Etes-vous sur ?
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogtrash = false"
                  >
                    Non
                  </v-btn>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="
                      supprimerRestaurant(selectedID);
                      dialogtrash = false;
                    "
                  >
                    Oui
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn
      class="btn-previous"
      type="submit"
      :disabled="page === 0"
      @click="pagePrecedente()"
      >Précédent</v-btn
    >
    <v-btn
      class="btn-next"
      type="submit"
      :disabled="page === nbPagesTotal"
      @click="pageSuivante()"
    >
      Suivant
    </v-btn>
    <p>Page courante : {{ page }}</p>
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>
      <v-dialog v-model="addConfirm" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="nom.length < 1 || cuisine.length < 1"
            small
            type="submit"
            v-bind="attrs"
            v-on="on"
          >
            Ajouter
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="justify-center"
            >Nouveau restaurant ajouté !</v-card-title
          >
          <v-card-actions class="justify-center">
            <v-btn color="primary" text @click="addConfirm = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </form>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      nomCuisineRecherche: "",
      dialogtrash: false,
      dialoginfo: false,
      addConfirm: false,
      selectedName: "",
      selectedID: "",
    };
  },
  mounted() {
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrecedente() {
      if (this.page === 0) return;

      this.page--;
      this.getRestaurantsFromServer();
    },
    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },
    getCuisinesFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&cuisine=" + this.nomCuisineRecherche;

      fetch(url)
        .then((responseJSON) => {
          // arrow functions, conserve le bon "this"
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestauRecherche;

      fetch(url)
        .then((responseJSON) => {
          // arrow functions, conserve le bon "this"
          // la réponse est en JSON, on la convertit avec la ligne suivante
          responseJSON.json().then((resJS) => {
            // Maintenant resJS est un vrai objet JavaScript
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    chercherRestaurants: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getRestaurantsFromServer();
    }, 300),
    chercherCuisines: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getCuisinesFromServer();
    }, 300),
    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r;

      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    setCourant(name) {
      this.selectedName = name;
    },
    setIDcourant(id) {
      this.selectedID = id;
    },
    ajouterRestaurant(event) {
      // Récupération du formulaire. Pas besoin de document.querySelector
      // ou document.getElementById puisque c'est le formulaire qui a généré
      // l'événement
      let form = event.target;

      // Récupération des valeurs des champs du formulaire
      // en prévision d'un envoi multipart en ajax/fetch
      let donneesFormulaire = new FormData(form);

      let url = "http://localhost:8080/api/restaurants";

      fetch(url, {
        method: "POST",
        body: donneesFormulaire,
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            // Maintenant res est un vrai objet JavaScript
            console.log(resJS.msg);
            this.msg = resJS.msg;
            // On rafraichit la vue
            this.getRestaurantsFromServer();
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.nom = "";
      this.cuisine = "";
    },
    getColor(index) {
      return index % 2 ? "white" : "lightgrey";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  text-align: center;
}

table {
  margin-right: auto;
  margin-left: auto;
}

.nom,
.cuisine {
  display: inline-block;
  margin: 5px;
}

.searchByNom,
.searchByCuisine {
  border-radius: 10px;
  background-color: #f1f3f5;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  border-width: 0.125rem;
  border-style: hidden;
}

.h1title {
  font-family: Arial, Tahoma, Bitstream Vera Sans, sans-serif;
  font-size: 32px !important;
  line-height: 2em;
  letter-spacing: 0.0125rem !important;
  text-align: center;
  flex: auto;
  padding: 10rem;
  color: #f1f3f5;
}

.home_img {
  background-image: url("../assets/home.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 30rem;
  background-position-y: -90px;
}
.btn-previous,
.btn-next {
  margin: 5px;
}
</style>
