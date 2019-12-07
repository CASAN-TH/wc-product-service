'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productattribute = mongoose.model('Productattribute');

var credentials,
    token,
    mockup;

describe('Productattribute CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "Color",
            slug: "pa_color",
            type: "select",
            order_by: "menu_order",
            has_archives: true,
            attributetems: [{
                name: "XXS",
                slug: "xxs",
                description: "thth",
                menu_order: 1,
                count: 1,
            }]
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

    it('should be Productattribute get use token', (done) => {
        request(app)
            .get('/api/productattributes')
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

    it('should be Productattribute get by id', function (done) {

        request(app)
            .post('/api/productattributes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productattributes/' + resp.data._id)
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
                        assert.equal(resp.data.type, mockup.type);
                        assert.equal(resp.data.order_by, mockup.order_by);
                        assert.equal(resp.data.has_archives, mockup.has_archives);

                        assert.equal(resp.data.attributetems[0].name, mockup.attributetems[0].name);
                        assert.equal(resp.data.attributetems[0].slug, mockup.attributetems[0].slug);
                        assert.equal(resp.data.attributetems[0].description, mockup.attributetems[0].description);
                        assert.equal(resp.data.attributetems[0].menu_order, mockup.attributetems[0].menu_order);
                        assert.equal(resp.data.attributetems[0].count, mockup.attributetems[0].count);
                        done();
                    });
            });

    });

    it('should be Productattribute post use token', (done) => {
        request(app)
            .post('/api/productattributes')
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
                assert.equal(resp.data.type, mockup.type);
                assert.equal(resp.data.order_by, mockup.order_by);
                assert.equal(resp.data.has_archives, mockup.has_archives);
                done();
            });
    });

    it('should be productattribute put use token', function (done) {

        request(app)
            .post('/api/productattributes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "Color1",
                    slug: "pa_color1",
                    type: "select1",
                    order_by: "name_num",
                    has_archives: false,
                    attributetems: [{
                        name: "XXS",
                        slug: "xxs",
                        description: "thth",
                        menu_order: 1,
                        count: 1,
                    }]
                }
                request(app)
                    .put('/api/productattributes/' + resp.data._id)
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
                        assert.equal(resp.data.type, update.type);
                        assert.equal(resp.data.order_by, update.order_by);
                        assert.equal(resp.data.has_archives, update.has_archives);
                        done();
                    });
            });

    });

    it('should be productattribute delete use token', function (done) {

        request(app)
            .post('/api/productattributes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productattributes/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productattribute get not use token', (done) => {
        request(app)
            .get('/api/productattributes')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productattribute post not use token', function (done) {

        request(app)
            .post('/api/productattributes')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productattribute put not use token', function (done) {

        request(app)
            .post('/api/productattributes')
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
                    .put('/api/productattributes/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productattribute delete not use token', function (done) {

        request(app)
            .post('/api/productattributes')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productattributes/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productattribute.remove().exec(done);
    });

});