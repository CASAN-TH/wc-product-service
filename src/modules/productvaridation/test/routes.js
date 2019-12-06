'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productvaridation = mongoose.model('Productvaridation');

var credentials,
    token,
    mockup;

describe('Productvaridation CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            // name: 'name'
            regular_price: "9.00",
            image: {
                id: 423
            },
            attributes: [
                {
                    id: 9,
                    option: "Black"
                }
            ]
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

    it('should be Productvaridation get use token', (done) => {
        request(app)
            .get('/api/productvaridations')
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

    it('should be Productvaridation get by id', function (done) {

        request(app)
            .post('/api/productvaridations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productvaridations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.regular_price, mockup.regular_price);
                        assert.equal(resp.data.image.id, mockup.image.id);
                        assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                        assert.equal(resp.data.attributes[0].option, mockup.attributes[0].option);
                        done();
                    });
            });

    });

    it('should be Productvaridation post use token', (done) => {
        request(app)
            .post('/api/productvaridations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.regular_price, mockup.regular_price);
                assert.equal(resp.data.image.id, mockup.image.id);
                assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                assert.equal(resp.data.attributes[0].option, mockup.attributes[0].option);
                done();
            });
    });

    it('should be productvaridation put use token', function (done) {

        request(app)
            .post('/api/productvaridations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    // name: 'name update'
                    regular_price: "9.00",
                    image: {
                        id: 423
                    },
                    attributes: [
                        {
                            id: 9,
                            option: "Black"
                        }
                    ]
                }
                request(app)
                    .put('/api/productvaridations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp);
                        assert.equal(resp.data.regular_price, update.regular_price);
                        assert.equal(resp.data.image.id, update.image.id);
                        assert.equal(resp.data.attributes[0].id, update.attributes[0].id);
                        assert.equal(resp.data.attributes[0].option, update.attributes[0].option);
                        done();
                    });
            });

    });

    it('should be productvaridation delete use token', function (done) {

        request(app)
            .post('/api/productvaridations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productvaridations/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productvaridation get not use token', (done) => {
        request(app)
            .get('/api/productvaridations')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productvaridation post not use token', function (done) {

        request(app)
            .post('/api/productvaridations')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productvaridation put not use token', function (done) {

        request(app)
            .post('/api/productvaridations')
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
                    .put('/api/productvaridations/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productvaridation delete not use token', function (done) {

        request(app)
            .post('/api/productvaridations')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productvaridations/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productvaridation.remove().exec(done);
    });

});