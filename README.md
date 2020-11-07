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

# Authors

+ Rémi Longin
+ Guilhem Fabre-Sauterey 

