<template src="./template.html"></template>

<style src="./style.css">
</style>
<script>
import _ from "lodash";
export default {
  name: "ListeDesRestaurants",
  props: ["fav1"],
  data: function () {
    return {
      restaurants: [],
      nom: "",
      cuisine: "",
      borough: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      nomCuisineRecherche: "",
      nomQuartierRecherche: "",
      dialogtrash: false,
      dialoginfo: false,
      addConfirm: false,
      addFav: false,
      selectedName: "",
      selectedID: "",
      favoris: [],
      columnHeaders: ["Nom", "Cuisine", "Quartier", "Details", " ", " "],
      slider: { label: "Restaurants par page", color: "#32AE87" },
    };
  },
  mounted() {
    this.getRestaurantsFromServer();
  },
  computed: {
    
    randomRestaurantName() {
      if (this.restaurants.length > 0) {
        const r = Math.floor(Math.random() * this.restaurants.length);
        const restoName = this.restaurants[r].name;
        return restoName
      }
      return "toto";
      
    },
  },
  methods: {
    ajoutFavoris(rid) {
      if(!this.favoris.includes(rid)){
        this.favoris.push(rid);
      }
      console.log(this.favoris);
    },
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
    pageder() {
      if (this.page === this.nbPagesTotal) return;
      if (this.page >= this.nbPagesTotal) {
        this.page = this.nbPagesTotal;
      }
      this.page += this.nbPagesTotal - this.page;
      this.getRestaurantsFromServer();
    },
    pageprems() {
      this.page = 0;
      this.getRestaurantsFromServer();
    },
    getQuartiersFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&borough=" + this.nomQuartierRecherche;

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
      if (this.nomQuartierRecherche != "") {
        url += "&borough=" + this.nomQuartierRecherche;
        console.log("nom quartier ajouté " + this.nomQuartierRecherche);
      }
      if (this.nomCuisineRecherche != "") {
        url += "&cuisine=" + this.nomCuisineRecherche;
        console.log("nom cuisine ajouté " + this.nomCuisineRecherche);
      }

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
    chercherQuartiers: _.debounce(function () {
      // appelée que si on n'a pas tapé de touches pendant un certain délai
      this.getQuartiersFromServer();
    }, 300),
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
      this.borough = "";
    },
    getColor(index) {
      return index % 2 ? "#FAF1ED" : "#FAF1ED";
    },
  },
};
</script>


