var express = require('express');
var router = express.Router();

const tf = require('@tensorflow/tfjs');

//const anyModelJson = require("../tfjs-any/model.json");
//const anyModelWeights = require("../tfjs-any/group1-shard1of1.bin");

/* GET any injuries prediction */
router.get('/any', function(req, res, next) {
    loadModel().then((model) => {
        console.log('DATA:', model)
        res.json(model);
      })
      .catch((error) => {
        console.log('ERROR:', error)
        res.status(500);
      })
});

async function loadModel() {
    const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Paul-Lecander/final-project/main/ML/tfjs_any/model.json');
    return model;
}

module.exports = router;