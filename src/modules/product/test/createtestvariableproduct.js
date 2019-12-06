'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Product = mongoose.model('Product');

var credentials,
    token,
    mockup;

describe('Product CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            // attributes: [
            //     {
            //         id: 232,
            //         name: "dsdsd",
            //         options: [
            //             "dfasdfdf",
            //             "sdsdsd"
            //         ]
            //     }
            // ],
            meta_data: [
                {
                    id: 13,
                    key: "1324",
                    value: "bule | gold | dark blue | grey",
                }
            ],
            images: [
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
                },
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_back.jpg"
                }
            ],
            sku: "V001",
            purchasable: true,
            downloadable: true,
            virtual: true,
            manage_stock: true,
            regular_price: "2,000",
            sale_price: "1,500",
            stock_status: "instock",
            weight: "500g",
            dimensions: {
                length: "llll",
                width: "wwww",
                height: "hhhh"
            },
            shipping_class: "No shipping_class",
            shipping_class_id: "10",
            description: "nnbuvgbvbudvajddjkvkcjbucbdvvdhvhdbdkhijdjsodls",





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


    it('createtestvariableproduct', (done) => {
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
                        // console.log(resp.attributes[0].option);
                        assert.equal(resp.status, 200);

                        // assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                        // assert.equal(resp.data.attributes[0].name, mockup.attributes[0].name);
                        // console.log(resp.data.attributes[0]);
                        // assert.equal(resp.data.attributes[0].options[0], mockup.attributes[0].options[0]);

                        assert.equal(resp.data.meta_data.id, mockup.meta_data.id);
                        assert.equal(resp.data.meta_data.key, mockup.meta_data.key);
                        assert.equal(resp.data.meta_data.value, mockup.meta_data.value);


                        assert.equal(resp.data.images[0].src, mockup.images[0].src);
                        assert.equal(resp.data.images[1].src, mockup.images[1].src);

                        assert.equal(resp.data.sku, mockup.sku);
                        assert.equal(resp.data.purchasable, mockup.purchasable);
                        assert.equal(resp.data.downloadable, mockup.downloadable);
                        assert.equal(resp.data.virtual, mockup.virtual);
                        assert.equal(resp.data.manage_stock, mockup.manage_stock);
                        assert.equal(resp.data.regular_price, mockup.regular_price);
                        assert.equal(resp.data.sale_price, mockup.sale_price);
                        assert.equal(resp.data.stock_status, mockup.stock_status);
                        assert.equal(resp.data.weight, mockup.weight);

                        assert.equal(resp.data.dimensions.length, mockup.dimensions.length);
                        assert.equal(resp.data.dimensions.width, mockup.dimensions.width);
                        assert.equal(resp.data.dimensions.height, mockup.dimensions.height);

                        assert.equal(resp.data.shipping_class, mockup.shipping_class);
                        assert.equal(resp.data.shipping_class_id, mockup.shipping_class_id);
                        assert.equal(resp.data.description, mockup.description);

                        done();
                    });
            });

    });




    afterEach(function (done) {
        Product.remove().exec(done);
    });

});