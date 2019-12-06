'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductreviewSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productreview name',
    // },

    product_id: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["approved", "hold", "spam", "unspam", "trash", "untrash"],
        default: "approved"
    },
    reviewer: {
        type: String,
    },
    reviewer_email: {
        type: String,
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
    },
    verified: {
        type: Boolean,
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

mongoose.model("Productreview", ProductreviewSchema);