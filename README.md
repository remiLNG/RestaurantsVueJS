# RestaurantsVueJS

## Technologies used

+ Node Js
+ Vue Js
+ MongoDB
+ Vuetify

## import the dataset

https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json

```
mongoimport --db test --collection restaurants --drop --file primer-dataset.json
```

# Run

+ start mongoDB in a terminal

```
mongod
```

## install all the dependencies

+ Move to server folder
```
...\RestaurantsVueJS\serveur>
```

```
...\RestaurantsVueJS\serveur> npm i 
```

+ Start the server
```
...\RestaurantsVueJS\serveur> node serverCrudWithMongo.js
```

+ Move to main folder

```
...\RestaurantsVueJS> npm i 
```

```
...\RestaurantsVueJS> npm i -g serve
```
+ Start the client 
```
...\RestaurantsVueJS> npm run serve
```
# Features 
Refonte Graphique (utilisation de Vuetify)
## Page d'accueil
+ Liste de tous les restaurants
+ Ajouter un nouveau restaurant
+ Supprimer un restaurant de la liste
+ Recherche par nom, cuisine et quartier
+ Restaurant du moment 
+ Naviguer dans la liste des restaurants (Acceder premiere et derniere page)
+ Choisir le nombre de restaurant dans la liste
+ Ajouter un restaurant dans ses favoris
+ Acceder aux details des restaurants
+ Acceder à liste des favoris
+ Avoir le nombre total de restaurant dans la liste

## Page Favoris
+ Avoir la liste des restaurants ajoutés en favoris
+ Acceder aux details des restaurants
+ Retourner sur la page d'acceuil

## Page Details
+ Afficher les details du restaurant choisi
+ Ajouter en favoris depuis cette page
+ Acceder à la page d'accueil
+ Accederà la page favoris
+ Afficher la position,les coordonnées du restaurant sur une map (utilisation de leaflet)
+ Afficher un menu généré (entrees,plats,desserts,description et prix) aléatoirement à partir d'un autre json
+ Afficher quelques details (fourchette de prix par rapport aux plats du menu, le type de cuisine et la note du restaurant)


# Authors

+ Rémi Longin
+ Guilhem Fabre-Sauterey 

