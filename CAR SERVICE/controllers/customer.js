const Service = require('../models/service');
const Car = require('../models/cars');

exports.getIndex = (req, res, next) => {

    res.render('customer/index', {
        title: 'AUTOTECH',
        path: '/',
    }).catch(err => {
        console.log(err);
    });
}
/*
exports.getServices = (req, res, next) => {
    Services.find()
        .then(services =>{
            res.render('customer/services', {
                title: 'Servis Geçmişi',
                services: services,
                path: '/services',
                action: req.query.action
            })
        })
}
*/
exports.getSearch = (req, res, next) => {
    res.render('customer/search', {
        title: 'Plaka Sorgula',
        path: '/search'
    });
}

exports.postSearch = (req, res, next) => {
    const plate = req.body.plate;
    var id = 0;
    const model = [];

    Service.find({carPlate: plate})
        .then(services => {
            model.services = services;
            return Car.findOne({plate: plate});            
        })
        .then(car => {
            res.render('customer/services', {
                title: 'Servis Geçmişi',
                path: '/search',
                car: car,
                services: model.services
            });
        })
        .catch((err) => {
            console.log(err);
        });
    // Service.find({carPlate: plate})
    //     .then(services => {
    //         res.render('customer/services', {
    //             title: 'Servis Geçmişi',
    //             path: '/search',
    //             services: services
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
}

