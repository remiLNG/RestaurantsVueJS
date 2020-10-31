

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'



import ListeDesRestaurants from './components/ListeDesRestaurants.vue'
import Detail from './components/Detail.vue'
import Favoris from './components/Favoris.vue'
import Vuetify from 'vuetify/lib'


import 'leaflet/dist/leaflet.css';


Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter)


//On définit les routes 

const router = new VueRouter({
  routes: [
    {
      path :'/',
      component : ListeDesRestaurants,
      name :'ListeDesRestaurants',
      props:true,
    },
    {
      path :'/detail/:id',
      component : Detail,
      props:true,
    },
    {
      path:'/favoris',
      component : Favoris,
      name: 'favoris',
      props:true,
    }
  ],
  mode :'history'
});
new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
