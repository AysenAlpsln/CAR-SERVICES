const Service = require('../models/service');
const Car = require('../models/cars');


exports.getCars = (req, res, next) => {
    Car
        .find()
        .then(cars => {
            res.render('admin/cars', {
                title: 'Araçlar',
                cars: cars,
                path: '/admin/cars',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getAddCar = (req, res, next) => {
    res.render('admin/add-car', {
        title: 'Yeni Araç Ekleme',
        path: '/admin/add-car'
    });
}

exports.postAddCar = (req, res, next) => {
    const plate = req.body.plate;
    const model = req.body.model;
    const customer = req.body.customer;
    const km = req.body.km;

    const car = new Car({
        plate: plate,
        model: model,
        customer: customer,
        km: km
    });

    car.save()
        .then(() => {
            res.redirect('/admin/cars');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditCar = (req, res, next) => {
    Car.findById(req.params.carid)
    .then(car => {
        res.render('admin/edit-car', {
            title: 'Araç Bilgisi Düzenleme',
            path: '/admin/cars',
            car: car,
            isAuthenticated: req.session.isAuthenticated
        });
    })
    .catch(err => console.log(err));
}

exports.postEditCar = (req, res, next) => {
    const id = req.body.id;
    const plate = req.body.plate;
    const model = req.body.model;
    const customer = req.body.customer;
    const km = req.body.km;

    Car.updateOne({ _id: id}, {
        $set: {
            plate: plate,
            model: model,
            customer: customer,
            km: km
        }
    }).then(() => {
        res.redirect('/admin/cars?action=edit');
    }).catch(err => console.log(err));
}

exports.postDeleteCar = (req, res, next) => {
    const id = req.body.carid;

    Car.deleteOne({_id: id})
        .then((result) => {
            if(result.deletedCount === 0){
                return res.redirect('/');
            }
            res.redirect('/admin/cars?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}



exports.getServices = (req, res, next) => { 

    Service.find()
        .then(services => {
            res.render('admin/services', {
                title: 'Servis İşlemleri',
                services: services,
                path: '/admin/services',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getAddService = (req, res, next) => {
    Car.findById(req.params.carid)
        .then(car => {
            res.render('admin/add-service', {
                title: 'Servis İşlemi Ekleme',
                path: '/admin/services',
                car: car,
                isAuthenticated: req.session.isAuthenticated
            });
        })
    
}

exports.postAddService = (req, res, next) => {
    const id = req.params.carid;
    const plate = req.body.plate;
    const km = req.body.km;
    const description = req.body.description;
    
    const service = new Service();
    service.description = description;
    service.carPlate = plate;

    service.save()
        .then((result) => {
            Car.findOne({plate: plate}, (err, car) => {
                if(car){
                    car.services.push(service);
                    car.km = km;
                    car.save();
                    console.log('Servis oluşturuldu.');
                }
            });
        })
        .then(() => {
            res.redirect('/admin/services');
        })
        .catch(err => {console.log(err)});
}


exports.getEditService = (req, res, next) => {
    Service.findById(req.params.serviceid)
        .then(service => {
            res.render('admin/edit-services', {
                title: 'Servis Bilgisi Düzenleme',
                path: '/admin/services',
                service: service,
                isAuthenticated: req.session.isAuthenticated
            });
        })
        .catch(err => console.log(err));
}

exports.postEditService = (req, res, next) => {
    const id = req.body.id;
    const description = req.body.description;

    Service.updateOne({ _id: id}, {
        $set: {
            description: description
        }
    }).then(() => {
        res.redirect('/admin/services?action=edit');
    }).catch(err => console.log(err));
}


exports.postDeleteService= (req, res, next) => {
    const id = req.body.serviceid;

    Service.deleteOne({_id: id})
        .then((result) => {
            if(result.deletedCount === 0){
                return res.redirect('/');
            }
            res.redirect('/admin/services?action=delete');
        })
        .catch(err => {
            console.log(err);
        });
}

