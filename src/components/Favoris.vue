<template>
  <div>
    <div class="toolbar">
      <v-app-bar color="#FAF1ED" dense flat>
        <v-btn>
          <router-link
            :to="{ name: 'ListeDesRestaurants', params: { fav1: fav } }"
            >Retour</router-link
          >
        </v-btn>
      </v-app-bar>
    </div>
    <div id="fav-img">
      <h1>Liste des favoris</h1>
    </div>

    <v-simple-table v-if="fav && fav.length > 0">
      <thead v-if="fav">
        <tr>
          <th>Nom</th>
          <th>Cuisine</th>
          <th>Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(f, i) in fav" :key="i">
          <td>{{ fav[i].name }}</td>
          <td>{{ fav[i].cuisine }}</td>
          <td class="info-btn">
            <v-btn icon>
              <router-link :to="'/detail/' + fav[i]._id"
                ><v-icon transparent> fas fa-info-circle </v-icon></router-link
              >
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-footer absolute color="#FAF1ED">
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
  props: ["fav"],
};
</script>

<style scoped>
div {
  text-align: center;
  font-family: Arial, Tahoma, Bitstream Vera Sans, sans-serif;
}

#fav-img {
  background-image: url("../assets/fav.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 30rem;
  background-position-y: -200px;
}

h1 {
  font-family: Arial, Tahoma, Bitstream Vera Sans, sans-serif;
  font-size: 32px !important;
  line-height: 2em;
  letter-spacing: 0.0125rem !important;
  text-align: center;
  flex: auto;
  padding: 10rem;
  padding-bottom: 1rem;
  color: #f1f3f5;
}
</style>