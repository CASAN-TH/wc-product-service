'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productcategorie = mongoose.model('Productcategorie');

var credentials,
    token,
    mockup;

describe('Productcategorie CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            // name: 'name'
            name: "Clothing",
            slug: "clothing",
            parent: 0,
            description: "",
            display: "default",
            image: {
                src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
            },
            menu_order: 0,
            count: 36,
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Productcategorie get use token', (done) => {
        request(app)
            .get('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Productcategorie get by id', function (done) {

        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productcategories/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.slug, mockup.slug);
                        assert.equal(resp.data.parent, mockup.parent);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.display, mockup.display);
                        assert.equal(resp.data.image.src, mockup.image.src);
                        assert.equal(resp.data.menu_order, mockup.menu_order);
                        assert.equal(resp.data.count, mockup.count);
                        done();
                    });
            });

    });

    it('should be Productcategorie post use token', (done) => {
        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.slug, mockup.slug);
                assert.equal(resp.data.parent, mockup.parent);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.display, mockup.display);
                assert.equal(resp.data.image.src, mockup.image.src);
                assert.equal(resp.data.menu_order, mockup.menu_order);
                assert.equal(resp.data.count, mockup.count);
                done();
            });
    });

    it('should be productcategorie put use token', function (done) {

        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "Clothing1",
                    slug: "clothing1",
                    parent: 1,
                    description: "lex",
                    display: "products",
                    image: {
                        src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
                    },
                    menu_order: 1,
                    count: 37,
                }
                request(app)
                    .put('/api/productcategories/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp);
                        // assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.slug, update.slug);
                        assert.equal(resp.data.parent, update.parent);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.display, update.display);
                        assert.equal(resp.data.image.src, update.image.src);
                        assert.equal(resp.data.menu_order, update.menu_order);
                        assert.equal(resp.data.count, update.count);
                        done();
                    });
            });

    });

    it('should be productcategorie delete use token', function (done) {

        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productcategories/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productcategorie get not use token', (done) => {
        request(app)
            .get('/api/productcategories')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productcategorie post not use token', function (done) {

        request(app)
            .post('/api/productcategories')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productcategorie put not use token', function (done) {

        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/productcategories/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productcategorie delete not use token', function (done) {

        request(app)
            .post('/api/productcategories')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productcategories/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productcategorie.remove().exec(done);
    });

});