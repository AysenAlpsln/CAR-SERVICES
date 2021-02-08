const express = require('express');
const router = express.Router();

const isAuthenticated = require('../middleware/authentication');
const csrf = require('../middleware/csrf');

const adminController = require('../controllers/admin');

router.get('/cars', csrf, isAuthenticated, adminController.getCars);

router.get('/add-car', csrf, isAuthenticated, adminController.getAddCar);

router.post('/add-car', csrf, isAuthenticated, adminController.postAddCar);

router.get('/cars/:carid', csrf, isAuthenticated, adminController.getEditCar);

router.post('/cars', csrf, isAuthenticated, adminController.postEditCar);

router.post('/delete-car', csrf, isAuthenticated, adminController.postDeleteCar);

router.get('/services', csrf, isAuthenticated, adminController.getServices);

router.get('/add-service/:carid', csrf, isAuthenticated, adminController.getAddService);

router.post('/add-service', csrf, isAuthenticated, adminController.postAddService);

router.get('/services/:serviceid', csrf, isAuthenticated, adminController.getEditService);

router.post('/services', csrf, isAuthenticated, adminController.postEditService);

router.post('/delete-service', csrf, isAuthenticated, adminController.postDeleteService);

module.exports = router;   