'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductshippingclasseSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productshippingclasse name',
    // },

    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    count: {
        type: Number,
    },






    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Productshippingclasse", ProductshippingclasseSchema);