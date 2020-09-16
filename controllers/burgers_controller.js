const express = require("express");
const router = express.Router();
const burger = require("../models/burgers.js");

// Import the burger.js file
// Create router for the application
// Export router when finished


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, false
  ], function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    res.redirect("/");
  });
});

router.get("/api/burger/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
        res.redirect("/");
    //   res.status(200).end();
    }
  });
});

router.get("/api/burger/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
        res.redirect("/");
    //   res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
