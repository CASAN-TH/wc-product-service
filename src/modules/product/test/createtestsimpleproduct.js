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
            name: "Ship Your Idea",
            short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            categories: [
                {
                    id: "01",
                    name: "Clothing1",
                    slug: "clothing1",
                },
                {
                    id: "02",
                    name: "Clothing2",
                    slug: "clothing2",
                }
            ],
            type: "simple",
            images: [
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
                },
                {
                    src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_back.jpg"
                }
            ],
            regular_price: "21.99",
            sale_price: "15.99",
            sku: "001",
            stock_status: "instock",
            sold_individually: true,
            weight: "56",
            dimensions: {
                length: "llll",
                width: "wwww",
                height: "hhhh"
            },
            shipping_class: "No shipping_class",
            shipping_class_id: 12,
            upsell_ids: [
                "klkl",
                "sssklkl",
            ],
            cross_sell_ids: [
                "ddklkl",
                "ddcssklkl",
            ],
            attributes: [
                {
                    id: 33,
                    name: "ddd",
                    position: 33,
                    visible: true,
                    variation: true,
                    options: [
                        "sdsds",
                        "fgfgfg"
                    ]
                }
            ],
            purchase_note: "klkkgh",
            menu_order: 34
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


    it('createtestsimpleproduct', (done) => {
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
                        // console.log(resp);
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.short_description, mockup.short_description);

                        assert.equal(resp.data.categories[0].id, mockup.categories[0].id);
                        assert.equal(resp.data.categories[0].name, mockup.categories[0].name);
                        assert.equal(resp.data.categories[0].slug, mockup.categories[0].slug);

                        assert.equal(resp.data.categories[1].id, mockup.categories[1].id);
                        assert.equal(resp.data.categories[1].name, mockup.categories[1].name);
                        assert.equal(resp.data.categories[1].slug, mockup.categories[1].slug);

                        assert.equal(resp.data.type, mockup.type);

                        assert.equal(resp.data.images[0].src, mockup.images[0].src);
                        assert.equal(resp.data.images[1].src, mockup.images[1].src);

                        assert.equal(resp.data.regular_price, mockup.regular_price);
                        assert.equal(resp.data.sale_price, mockup.sale_price);
                        assert.equal(resp.data.sku, mockup.sku);
                        assert.equal(resp.data.stock_status, mockup.stock_status);
                        assert.equal(resp.data.sold_individually, mockup.sold_individually);
                        assert.equal(resp.data.weight, mockup.weight);

                        assert.equal(resp.data.dimensions.length, mockup.dimensions.length);
                        assert.equal(resp.data.dimensions.width, mockup.dimensions.width);
                        assert.equal(resp.data.dimensions.height, mockup.dimensions.height);

                        assert.equal(resp.data.shipping_class, mockup.shipping_class);
                        assert.equal(resp.data.shipping_class_id, mockup.shipping_class_id);

                        assert.equal(resp.data.upsell_ids[0], mockup.upsell_ids[0]);
                        assert.equal(resp.data.cross_sell_ids[0], mockup.cross_sell_ids[0]);

                        assert.equal(resp.data.attributes[0].id, mockup.attributes[0].id);
                        assert.equal(resp.data.attributes[0].name, mockup.attributes[0].name);
                        assert.equal(resp.data.attributes[0].position, mockup.attributes[0].position);
                        assert.equal(resp.data.attributes[0].visible, mockup.attributes[0].visible);
                        assert.equal(resp.data.attributes[0].variation, mockup.attributes[0].variation);
                        assert.equal(resp.data.attributes[0].options[0], mockup.attributes[0].options[0]);

                        assert.equal(resp.data.purchase_note, mockup.purchase_note);
                        assert.equal(resp.data.menu_order, mockup.menu_order);

                        done();
                    });
            });

    });




    afterEach(function (done) {
        Product.remove().exec(done);
    });

});