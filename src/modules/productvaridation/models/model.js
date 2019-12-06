'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductvaridationSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Productvaridation name',
    // },


    description: {
        type: String,
    },
    permalink: {
        type: String,
    },
    sku: {
        type: String,
    },
    price: {
        type: String,
    },
    regular_price: {
        type: String,
    },
    sale_price: {
        type: String,
    },
    on_sale: {
        type: Boolean,
    },
    status: {
        type: String,
        enum: ["draft", "pending", "private ", "publish"],
        default: "publish"
    },
    purchasable: {
        type: Boolean,
    },
    virtual: {
        type: Boolean,
    },
    downloadable: {
        type: Boolean,
    },
    downloads: {
        type: [
            {
                id: {
                    type: String
                },
                name: {
                    type: String
                },
                file: {
                    type: String
                }
            }
        ]
    },
    download_limit: {
        type: Number,
    },
    download_expiry: {
        type: Number,
    },
    tax_status: {
        type: String,
        enum: ["taxable", "shipping ", "none "],
        default: "taxable"
    },
    tax_class: {
        type: String
    },
    manage_stock: {
        type: Boolean
    },
    stock_quantity: {
        type: Number
    },
    stock_status: {
        type: String,
        enum: ["instock", "outofstock ", "onbackorder "],
        default: "instock"
    },
    backorders: {
        type: String,
        enum: ["no", "notify  ", "yes "],
        default: "no"
    },
    backorders_allowed: {
        type: Boolean
    },
    backordered: {
        type: Boolean
    },
    weight: {
        type: String
    },
    dimensions: {
        type: {
            length: {
                type: String
            },
            width: {
                type: String
            },
            height: {
                type: String
            }
        }
    },
    shipping_class: {
        type: String
    },
    shipping_class_id: {
        type: String
    },
    image: {
        type: {
            id: {
                type: Number
            },
            src: {
                type: String
            },
            name: {
                type: String
            },
            alt: {
                type: String
            },
        }
    },
    attributes: {
        type: [
            {
                id: {
                    type: Number
                },
                name: {
                    type: String
                },
                option: {
                    type: String
                }
            }
        ]
    },
    menu_order: {
        type: Number
    },
    meta_data: {
        type: [
            {
                id: {
                    type: Number
                },
                key: {
                    type: String
                },
                value: {
                    type: String
                },
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

mongoose.model("Productvaridation", ProductvaridationSchema);