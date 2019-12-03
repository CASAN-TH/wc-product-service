'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Product = mongoose.model('Product');
// MetaDataProductSchema = mongoose.model('Product');

var credentials,
    token,
    mockup;

describe('Product CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "Ship Your Idea",
            type: "variable",
            regular_price: "21.99",
            description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
            short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            categories: [
                {
                    id: 9
                },
                {
                    id: 14
                }
            ],
            images: [
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
                },
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_back.jpg"
                },
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_front.jpg"
                },
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_back.jpg"
                }
            ],
            attributes: [
                {
                    id: 6,
                    position: 0,
                    visible: true,
                    variation: true,
                    options: [
                        "Black",
                        "Green"
                    ]
                },
                {
                    name: "Size",
                    position: 0,
                    visible: false,
                    variation: true,
                    options: [
                        "S",
                        "M"
                    ]
                }
            ],
            default_attributes: [
                {
                    id: 6,
                    option: "Black"
                },
                {
                    name: "Size",
                    option: "S"
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

    it('should be Product get use token', (done) => {
        request(app)
            .get('/api/products')
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


    it('should be Product get by id', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.type, mockup.type);
                        assert.equal(resp.data.regular_price, mockup.regular_price);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.short_description, mockup.short_description);

                        assert.equal(resp.data.categories[0].id, mockup.categories[0].id);
                        assert.equal(resp.data.categories[1].id, mockup.categories[1].id);

                        assert.equal(resp.data.images[0].src, mockup.images[0].src);
                        assert.equal(resp.data.images[1].src, mockup.images[1].src);
                        assert.equal(resp.data.images[2].src, mockup.images[2].src);
                        assert.equal(resp.data.images[3].src, mockup.images[3].src);

                        assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                        assert.equal(resp.data.attributes[0].position, mockup.attributes[0].position);
                        assert.equal(resp.data.attributes[0].visible, mockup.attributes[0].visible);
                        assert.equal(resp.data.attributes[0].variation, mockup.attributes[0].variation);
                        assert.equal(resp.data.attributes[0].options[0], mockup.attributes[0].options[0]);

                        assert.equal(resp.data.attributes[1].name, mockup.attributes[1].name);
                        assert.equal(resp.data.attributes[1].position, mockup.attributes[1].position);
                        assert.equal(resp.data.attributes[1].visible, mockup.attributes[1].visible);
                        assert.equal(resp.data.attributes[1].variation, mockup.attributes[1].variation);
                        assert.equal(resp.data.attributes[1].options[1], mockup.attributes[1].options[1]);

                        assert.equal(resp.data.default_attributes[0].id, mockup.default_attributes[0].id);
                        assert.equal(resp.data.default_attributes[0].option, mockup.default_attributes[0].option);

                        assert.equal(resp.data.default_attributes[1].name, mockup.default_attributes[1].name);
                        assert.equal(resp.data.default_attributes[1].option, mockup.default_attributes[1].option);
                        done();
                    });
            });

    });

    it('should be Product post use token', (done) => {
        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;

                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.type, mockup.type);
                assert.equal(resp.data.regular_price, mockup.regular_price);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.short_description, mockup.short_description);

                assert.equal(resp.data.categories[0].id, mockup.categories[0].id);
                assert.equal(resp.data.categories[1].id, mockup.categories[1].id);

                assert.equal(resp.data.images[0].src, mockup.images[0].src);
                assert.equal(resp.data.images[1].src, mockup.images[1].src);
                assert.equal(resp.data.images[2].src, mockup.images[2].src);
                assert.equal(resp.data.images[3].src, mockup.images[3].src);

                assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                assert.equal(resp.data.attributes[0].position, mockup.attributes[0].position);
                assert.equal(resp.data.attributes[0].visible, mockup.attributes[0].visible);
                assert.equal(resp.data.attributes[0].variation, mockup.attributes[0].variation);
                assert.equal(resp.data.attributes[0].options[0], mockup.attributes[0].options[0]);

                assert.equal(resp.data.attributes[1].name, mockup.attributes[1].name);
                assert.equal(resp.data.attributes[1].position, mockup.attributes[1].position);
                assert.equal(resp.data.attributes[1].visible, mockup.attributes[1].visible);
                assert.equal(resp.data.attributes[1].variation, mockup.attributes[1].variation);
                assert.equal(resp.data.attributes[1].options[1], mockup.attributes[1].options[1]);

                assert.equal(resp.data.default_attributes[0].id, mockup.default_attributes[0].id);
                assert.equal(resp.data.default_attributes[0].option, mockup.default_attributes[0].option);

                assert.equal(resp.data.default_attributes[1].name, mockup.default_attributes[1].name);
                assert.equal(resp.data.default_attributes[1].option, mockup.default_attributes[1].option);


                done();
            });
    });

    it('should be product put use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: "Ship Your Idea",
                    type: "variable",
                    regular_price: "21.99",
                    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
                    short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                    categories: [
                        {
                            id: 9
                        },
                        {
                            id: 14
                        }
                    ],
                    images: [
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_back.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_front.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_back.jpg"
                        }
                    ],
                    attributes: [
                        {
                            id: 6,
                            position: 0,
                            visible: true,
                            variation: true,
                            options: [
                                "Black",
                                "Green"
                            ]
                        },
                        {
                            name: "Size",
                            position: 0,
                            visible: false,
                            variation: true,
                            options: [
                                "S",
                                "M"
                            ]
                        }
                    ],
                    default_attributes: [
                        {
                            id: 6,
                            option: "Black"
                        },
                        {
                            name: "Size",
                            option: "S"
                        }
                    ]


                }
                request(app)
                    .put('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        console.log(resp);

                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.type, update.type);
                        assert.equal(resp.data.regular_price, update.regular_price);
                        assert.equal(resp.data.description, update.description);
                        assert.equal(resp.data.short_description, update.short_description);

                        assert.equal(resp.data.categories[0].id, update.categories[0].id);
                        assert.equal(resp.data.categories[1].id, update.categories[1].id);

                        assert.equal(resp.data.images[0].src, update.images[0].src);
                        assert.equal(resp.data.images[1].src, update.images[1].src);
                        assert.equal(resp.data.images[2].src, update.images[2].src);
                        assert.equal(resp.data.images[3].src, update.images[3].src);

                        assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                        assert.equal(resp.data.attributes[0].position, mockup.attributes[0].position);
                        assert.equal(resp.data.attributes[0].visible, mockup.attributes[0].visible);
                        assert.equal(resp.data.attributes[0].variation, mockup.attributes[0].variation);
                        assert.equal(resp.data.attributes[0].options[0], mockup.attributes[0].options[0]);

                        assert.equal(resp.data.attributes[1].name, mockup.attributes[1].name);
                        assert.equal(resp.data.attributes[1].position, mockup.attributes[1].position);
                        assert.equal(resp.data.attributes[1].visible, mockup.attributes[1].visible);
                        assert.equal(resp.data.attributes[1].variation, mockup.attributes[1].variation);
                        assert.equal(resp.data.attributes[1].options[1], mockup.attributes[1].options[1]);

                        assert.equal(resp.data.default_attributes[0].id, update.default_attributes[0].id);
                        assert.equal(resp.data.default_attributes[0].option, update.default_attributes[0].option);

                        assert.equal(resp.data.default_attributes[1].name, update.default_attributes[1].name);
                        assert.equal(resp.data.default_attributes[1].option, update.default_attributes[1].option);



                        done();
                    });
            });

    });

    it('should be product delete use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/products/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be product get not use token', (done) => {
        request(app)
            .get('/api/products')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be product post not use token', function (done) {

        request(app)
            .post('/api/products')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be product put not use token', function (done) {

        request(app)
            .post('/api/products')
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
                    .put('/api/products/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be product delete not use token', function (done) {

        request(app)
            .post('/api/products')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/products/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Product.remove().exec(done);
    });

});