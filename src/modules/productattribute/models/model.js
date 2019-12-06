'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductattributeSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productattribute name',
    // },

    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    type: {
        type: String,
    },
    order_by: {
        type: String,
        enum: ["menu_order", "name", "name_num", "id"],
        default: "menu_order"
    },
    has_archives: {
        type: Boolean,
    },
    attributetems: {
        type: [
            {
                name: {
                    type: String,
                },
                slug: {
                    type: String,
                },
                description: {
                    type: String,
                },
                menu_order: {
                    type: Number,
                },
                count: {
                    type: Number,
                }
            }
        ]
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

mongoose.model("Productattribute", ProductattributeSchema);