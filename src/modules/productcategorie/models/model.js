'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductcategorieSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productcategorie name',
    // },
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    parent: {
        type: Number,
    },
    description: {
        type: String,
    },
    display: {
        type: String,
        enum: ["default", "products", "subcategories ", "both"],
        default: "default"
    },
    image: {
        type: {
            src: {
                type: String,
            },
            name: {
                type: String,
            },
            alt: {
                type: String,
            }
        }
    },
    menu_order: {
        type: Number,
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

mongoose.model("Productcategorie", ProductcategorieSchema);