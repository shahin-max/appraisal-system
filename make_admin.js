const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const user = require("./make_admin_user.json");

const url = "mongodb://localhost:27017";

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;

    const db = client.db("appraisal_system_db");

    let filQuery = user;
    let updateQuery = { $set: { role: "admin"} };

    db.collection("users")
      .updateOne(filQuery, updateQuery)
      .then(result => {
        console.log("Status updated");
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        client.close();
      });
  }
);
