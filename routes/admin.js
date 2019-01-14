var express = require("express");
var router = express.Router();
//var mongo=require('mongodb');
const mongo = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

const assert = require("assert");
const url = "mongodb://localhost:27017/loginapp";

router.get("/getdata", function(req, res) {
  var resultArray = [];
  mongo.connect(
    url,
    function(err, client) {
      var client1 = client.db("loginapp");
      assert.equal(null, err);
      var cursor = client1.collection("userdata").find({}); // now all value in collection user-data store in cursor veriable
      cursor.forEach(
        function(doc, err) {
          assert.equal(null, err);
          resultArray.push(doc); // push add new item to the end of an array  and return new lenght of an array
        },
        function() {
          client.close();
          res.render("admin", { items: resultArray });
        }
      );
    }
  );
});

router.post("/insert", function(req, res) {
  var item = {
    title: req.body.title,
    content1: req.body.content,
    author: req.body.author,
    role: "User"
  };
  mongo.connect(
    url,
    function(err, client) {
      assert.equal(null, err); // check if error if wo don't have error than countinu
      var myclient = client.db("loginapp");
      const mycollection = myclient.collection("userdata");
      mycollection.insertOne(item, function(err, result) {
        assert.equal(null, err);
        client.close();
      });
    }
  );

  res.redirect("/");
});

router.post("/update", function(req, res) {
  var id = req.body.id;
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    role: req.body.role
  };
  if (req.body.role == "admin") {
    item.role = true;
  }
  mongo.connect(
    url,
    function(err, client) {
      assert.equal(null, err); // check if error if wo don't have error than countinu
      var myclient = client.db("loginapp");
      const mycollection = myclient.collection("userdata");
      mycollection.updateOne({ _id: objectId(id) }, { $set: item }, function(
        err,
        result
      ) {
        assert.equal(null, err);
        console.log("item Updated");
        client.close();
      });
    }
  );
  res.redirect("/");
});
router.post("/delete", async function(req, res) {
  var id = req.body.id;
  mongo.connect(
    url,
    function(err, client) {
      assert.equal(null, err); // check if error if wo don't have error than countinu
      var myclient = client.db("loginapp");
      const mycollection = myclient.collection("userdata");
      mycollection.deleteOne({ _id: objectId(id) }, function(err, result) {
        assert.equal(null, err);
        console.log("item deleted");
        client.close();
      });
    }
  );
  res.redirect("/");
});
module.exports = router;
