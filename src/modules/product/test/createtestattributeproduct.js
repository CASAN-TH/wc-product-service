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

describe('Product CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: "Color",
            slug: "pa_color",
            type: "select",
            order_by: "menu_order",
            has_archives: true,
            attributetems: [
                {
                    name: "XXS",
                    slug: "xxs",
                    description: "thth",
                    menu_order: 1,
                    count: 1,
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


    it('createtestattributeproduct', (done) => {
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
                        // assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.slug, mockup.slug);
                        assert.equal(resp.data.type, mockup.type);
                        assert.equal(resp.data.order_by, mockup.order_by);
                        assert.equal(resp.data.has_archives, mockup.has_archives);

                        // console.log(resp.data.attributetems[0]);
                        assert.equal(resp.data.attributetems[0].name, mockup.attributetems[0].name);
                        assert.equal(resp.data.attributetems[0].slug, mockup.attributetems[0].slug);
                        assert.equal(resp.data.attributetems[0].description, mockup.attributetems[0].description);
                        assert.equal(resp.data.attributetems[0].menu_order, mockup.attributetems[0].menu_order);
                        assert.equal(resp.data.attributetems[0].count, mockup.attributetems[0].count);



                        done();
                    });
            });

    });




    afterEach(function (done) {
        Productattribute.remove().exec(done);
    });

});