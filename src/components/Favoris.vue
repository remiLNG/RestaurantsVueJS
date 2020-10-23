<template>
  <div>
    <div id="fav-img">
    <h1>Liste des favoris</h1>
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
export default {};
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

h1{
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