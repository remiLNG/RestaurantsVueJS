import Vue from 'vue'
import Router from'vue-router'
import ListeDesRestaurants from "../components/ListeDesRestaurants";
import Favoris from "../components/Favoris"

Vue.use(Router)

export default new Router({
    routes: [
    {
        path: '/',
        name: 'ListeDesRestaurants',
        component: ListeDesRestaurants
    },
    {
        path: '/favoris',
        name: 'Favoris',
        component: Favoris
    } 
     
    ]
})
