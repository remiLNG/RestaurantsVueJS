var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;

var assert = require("assert");
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "test";

exports.connexionMongo = function(callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    assert.equal(null, err);
    callback(err, db);
  });
};

exports.countRestaurants = function(name, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    console.log("db " + db);
    if (!err) {
      if (name == "") {
        db.collection("restaurants")
          .count()
          .then((rep) => callback(rep));
      } else {
        let query = {
          name: { $regex: ".*" + name + ".*", $options: "i" },
        };
        db.collection("restaurants")
          .find(query)
          .count()
          .then((rep) => callback(rep));
      }
    }
  });
};

exports.findRestaurants = function(page, pagesize, name, cuisine, borough, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    console.log("db " + db);
    if (!err) {
      if (name == "" && cuisine == "" && borough == "") {
        db.collection("restaurants")
          .find()
          .skip(page * pagesize)
          .limit(pagesize)
          .toArray()
          .then((arr) => {
            db.collection("restaurants")
              .count()
              .then((rep) => callback(arr, rep));
          });
      }else if(cuisine !== "" && borough !=="" && name !== ""){  //recherche par nom, cuisine et quartier
          let query = {
            cuisine: { $regex: ".*" + cuisine + ".*", $options: "i" },
            borough: { $regex: ".*" + borough + ".*", $options: "i" },
            name: { $regex: ".*" + name + ".*", $options: "i" },
          };
          db.collection("restaurants")
            .find(query)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then((arr) => {
            db.collection("restaurants")
              .find(query)
              .count()
              .then((rep) => callback(arr, rep));
            });
        }else if(cuisine !== "" && borough !==""){ //recherche par cuisine et quartier
          let query = {
            cuisine: { $regex: ".*" + cuisine + ".*", $options: "i" },
            borough: { $regex: ".*" + borough + ".*", $options: "i" },
          };
          db.collection("restaurants")
            .find(query)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then((arr) => {
            db.collection("restaurants")
              .find(query)
              .count()
              .then((rep) => callback(arr, rep));
            });
        }else if(cuisine !== "" && name !==""){ //recherche par cuisine et nom
          let query = {
            cuisine: { $regex: ".*" + cuisine + ".*", $options: "i" },
            name: { $regex: ".*" + name + ".*", $options: "i" },
          };
          db.collection("restaurants")
            .find(query)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then((arr) => {
            db.collection("restaurants")
              .find(query)
              .count()
              .then((rep) => callback(arr, rep));
            });
        }else if(name !== "" && borough !==""){ //recherche par nom et quartier
          let query = {
            name: { $regex: ".*" + name + ".*", $options: "i" },
            borough: { $regex: ".*" + borough + ".*", $options: "i" },
          };
          db.collection("restaurants")
            .find(query)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then((arr) => {
            db.collection("restaurants")
              .find(query)
              .count()
              .then((rep) => callback(arr, rep));
            });
        }
        else if (name !== "") { //recherche par nom
          let query = {
            name: { $regex: ".*" + name + ".*", $options: "i" },
          };
          db.collection("restaurants")
            .find(query)
            .skip(page * pagesize)
            .limit(pagesize)
            .toArray()
            .then((arr) => {
              db.collection("restaurants")
                .find(query)
                .count()
                .then((rep) => callback(arr, rep));
            });
          
        }
        else if (cuisine !== "") { //recherche par cuisine
			let query = {
			  cuisine: { $regex: ".*" + cuisine + ".*", $options: "i" },
			};
			db.collection("restaurants")
			  .find(query)
			  .skip(page * pagesize)
			  .limit(pagesize)
			  .toArray()
			  .then((arr) => {
				db.collection("restaurants")
				  .find(query)
				  .count()
				  .then((rep) => callback(arr, rep));
			  });
      }else if (borough !== "") { //recherche par quartier
        let query = {
          borough: { $regex: ".*" + borough + ".*", $options: "i" },
        };
        db.collection("restaurants")
          .find(query)
          .skip(page * pagesize)
          .limit(pagesize)
          .toArray()
          .then((arr) => {
          db.collection("restaurants")
            .find(query)
            .count()
            .then((rep) => callback(arr, rep));
          });
        }
      
    } else {
      callback(-1);
    }
  });
};

exports.findRestaurantById = function(id, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);
    if (!err) {
      // La requete mongoDB

      let myquery = { _id: ObjectId(id) };

      db.collection("restaurants").findOne(myquery, function(err, data) {
        let reponse;

        if (!err) {
          reponse = {
            succes: true,
            restaurant: data,
            error: null,
            msg: "Details du restaurant envoyés",
          };
        } else {
          reponse = {
            succes: false,
            restaurant: null,
            error: err,
            msg: "erreur lors du find",
          };
        }
        callback(reponse);
      });
    } else {
      let reponse = (reponse = {
        succes: false,
        restaurant: null,
        error: err,
        msg: "erreur de connexion à la base",
      });
      callback(reponse);
    }
  });
};

exports.createRestaurant = function(formData, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    if (!err) {
      let toInsert = {
        name: formData.nom,
        cuisine: formData.cuisine,
        borough: formData.borough,
      };
      console.dir(JSON.stringify(toInsert));
      db.collection("restaurants").insert(toInsert, function(err, insertedId) {
        let reponse;

        console.log("++++" + insertedId);

        if (!err) {
          reponse = {
            succes: true,
            result: insertedId.ops[0]._id,
            error: null,
            msg: "Ajout réussi " + insertedId.ops[0]._id,
          };
        } else {
          reponse = {
            succes: false,
            error: err,
            msg: "Problème à l'insertion",
          };
        }
        callback(reponse);
      });
    } else {
      let reponse = (reponse = {
        succes: false,
        error: err,
        msg: "Problème lors de l'insertion, erreur de connexion.",
      });
      callback(reponse);
    }
  });
};

exports.updateRestaurant = function(id, formData, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    if (!err) {
      let myquery = { _id: ObjectId(id) };
      let newvalues = {
        name: formData.nom,
        cuisine: formData.cuisine,
        borough: formData.borough,
      };

      db.collection("restaurants").replaceOne(myquery, newvalues, function(
        err,
        result
      ) {
        if (!err) {
          reponse = {
            succes: true,
            result: result,
            error: null,
            msg: "Modification réussie " + result,
          };
        } else {
          reponse = {
            succes: false,
            error: err,
            msg: "Problème à la modification",
          };
        }
        callback(reponse);
      });
    } else {
      let reponse = (reponse = {
        succes: false,
        error: err,
        msg: "Problème lors de la modification, erreur de connexion.",
      });
      callback(reponse);
    }
  });
};

exports.deleteRestaurant = function(id, callback) {
  MongoClient.connect(url, function(err, client) {
    var db = client.db(dbName);

    if (!err) {
      let myquery = { _id: ObjectId(id) };

      db.collection("restaurants").deleteOne(myquery, function(err, result) {
        if (!err) {
          reponse = {
            succes: true,
            result: result,
            error: null,
            msg: "Suppression réussie " + result,
          };
        } else {
          reponse = {
            succes: false,
            error: err,
            msg: "Problème à la suppression",
          };
        }
        callback(reponse);
      });
    } else {
      let reponse = (reponse = {
        succes: false,
        error: err,
        msg: "Problème lors de la suppression, erreur de connexion.",
      });
      callback(reponse);
    }
  });
};
