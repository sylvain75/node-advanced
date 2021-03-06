const express = require('express');
const router = express.Router();
const storeController = require("../controllers/storeController");
const { catchErrors } = require('../handlers/errorHandlers');

// Do work here
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/', storeController.homePage);
router.get('/add', storeController.addStore);
router.post("/add", catchErrors(storeController.createStore));
router.post("/add/:id", catchErrors(storeController.updateStore));
router.get("/store/:id/edit", catchErrors(storeController.editStore));

module.exports = router;
