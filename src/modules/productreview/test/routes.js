'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Productreview = mongoose.model('Productreview');

var credentials,
    token,
    mockup;

describe('Productreview CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            // name: 'name'
            product_id: 22,
            status: "approved",
            reviewer: "John Doe",
            reviewer_email: "john.doe@example.com",
            review: "Nice album!",
            rating: 5,
            verified: false
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

    it('should be Productreview get use token', (done) => {
        request(app)
            .get('/api/productreviews')
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

    it('should be Productreview get by id', function (done) {

        request(app)
            .post('/api/productreviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/productreviews/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        // console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.product_id, mockup.product_id);
                        assert.equal(resp.data.status, mockup.status);
                        assert.equal(resp.data.reviewer, mockup.reviewer);
                        assert.equal(resp.data.reviewer_email, mockup.reviewer_email);
                        assert.equal(resp.data.review, mockup.review);
                        assert.equal(resp.data.rating, mockup.rating);
                        assert.equal(resp.data.verified, mockup.verified);
                        done();
                    });
            });

    });

    it('should be Productreview post use token', (done) => {
        request(app)
            .post('/api/productreviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                // assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.product_id, mockup.product_id);
                assert.equal(resp.data.status, mockup.status);
                assert.equal(resp.data.reviewer, mockup.reviewer);
                assert.equal(resp.data.reviewer_email, mockup.reviewer_email);
                assert.equal(resp.data.review, mockup.review);
                assert.equal(resp.data.rating, mockup.rating);
                assert.equal(resp.data.verified, mockup.verified);
                done();
            });
    });

    it('should be productreview put use token', function (done) {

        request(app)
            .post('/api/productreviews')
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
                    product_id: 23,
                    status: "hold",
                    reviewer: "John Doe1",
                    reviewer_email: "john1.doe@example.com",
                    review: "Nice album1!",
                    rating: 6,
                    verified: true
                }
                request(app)
                    .put('/api/productreviews/' + resp.data._id)
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
                        assert.equal(resp.data.product_id, update.product_id);
                        assert.equal(resp.data.status, update.status);
                        assert.equal(resp.data.reviewer, update.reviewer);
                        assert.equal(resp.data.reviewer_email, update.reviewer_email);
                        assert.equal(resp.data.review, update.review);
                        assert.equal(resp.data.rating, update.rating);
                        assert.equal(resp.data.verified, update.verified);
                        done();
                    });
            });

    });

    it('should be productreview delete use token', function (done) {

        request(app)
            .post('/api/productreviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productreviews/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be productreview get not use token', (done) => {
        request(app)
            .get('/api/productreviews')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be productreview post not use token', function (done) {

        request(app)
            .post('/api/productreviews')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be productreview put not use token', function (done) {

        request(app)
            .post('/api/productreviews')
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
                    .put('/api/productreviews/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be productreview delete not use token', function (done) {

        request(app)
            .post('/api/productreviews')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/productreviews/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Productreview.remove().exec(done);
    });

});