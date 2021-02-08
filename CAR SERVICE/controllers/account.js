const User = require('../models/user');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey('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');

exports.getLogin = (req,res,next) =>{
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        errorMessage: errorMessage
    });
}

exports.postLogin = (req,res,next) =>{

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user =>{
            if(!user) {
                req.session.errorMessage = 'Bu mail adresi ile bir kayıt bulunamamıştır.';
                req.session.save(function(err){
                    console.log(err);
                    return res.redirect('/login');
                })
            }

            bcrypt.compare(password, user.password)
                .then(isSuccess =>{
                    if(isSuccess) {
                        // login olabilir
                        req.session.user = user;
                        req.session.isAuthenticated = true;
                        return req.session.save(function(err){
                            var url = req.session.redirectTo || '/';
                            delete req.session.redirectTo;
                            return res.redirect(url);
                        });
                    }
                    // girdiği bilgi yanlış ise
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getRegister = (req,res,next) =>{
    var errorMessage = req.session.errorMessage;
    delete req.session.errorMessage;
    res.render('account/register', {
        path: '/register',
        title: 'Register',
        errorMessage: errorMessage
    });
}

exports.postRegister = (req,res,next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user =>{
            if(user){
                req.session.errorMessage = 'Bu mail adresi ile bir kayıt mevcut.';
                req.session.save(function(err){
                    console.log(err);
                    return res.redirect('/register');
                })
            }

            return bcrypt.hash(password,10);
        })
        .then(hashedPassword => {
            console.log(hashedPassword);
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                cart: { items: []}
            });
            return newUser.save()
        })
        .then(()=>{
            res.redirect('/login');

            const msg = {
                to: email,
                from: 'aysenalpaslan01@gmail.com', 
                subject: 'Hoşgeldiniz :)',
                html: '<h1>Hesabınız başarılı bir şekilde oluşturuldu.</h1>',
            }
            sgMail.send(msg);
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getLogout = (req, res, next) =>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/login');
    });
}
