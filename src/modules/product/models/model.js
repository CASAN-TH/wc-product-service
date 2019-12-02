'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Product name',
    // },
    name: {
        type: String
    },
    slug: {
        type: String
    },
    type: {
        type: String,
        enum: ["simple", "grouped", "external", "variable"],
        default: "simple"
    },
    status: {
        type: String,
        enum: ["draft", "pending", "private ", "publish"],
        default: "publish"
    },
    featured: {
        type: Boolean
    },
    catalog_visibility: {
        type: String,
        enum: ["visible", "catalog", "search  ", "hidden"],
        default: "visible"
    },
    description: {
        type: String
    },
    short_description: {
        type: String
    },
    sku: {
        type: String
    },
    price: {
        type: String
    },
    regular_price: {
        type: String
    },
    sale_price: {
        type: String
    },
    price_html: {
        type: String
    },
    on_sale: {
        type: Boolean
    },
    purchasable: {
        type: Boolean
    },
    total_sales: {
        type: Number
    },
    virtual: {
        type: Boolean
    },
    downloadable: {
        type: Boolean
    },
    downloads: {
        type: Array
    },
    download_limit: {
        type: Number
    },
    download_expiry: {
        type: Number
    },
    external_url: {
        type: String
    },
    button_text: {
        type: String
    },
    tax_status: {
        type: String
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
        enum: ["instock", "outofstock", "onbackorder "],
        default: "instock"
    },
    backorders: {
        type: String,
        enum: ["no", "notify", "yes"],
        default: "no"
    },
    backorders_allowed: {
        type: Boolean
    },
    backordered: {
        type: Boolean
    },
    sold_individually: {
        type: Boolean
    },
    weight: {
        type: String
    },
    dimensions: {
        type: Object
    },
    shipping_required: {
        type: Boolean
    },
    shipping_taxable: {
        type: Boolean
    },
    shipping_class: {
        type: String
    },
    shipping_class_id: {
        type: Number
    },
    reviews_allowed: {
        type: Boolean
    },
    average_rating: {
        type: String
    },
    rating_count: {
        type: Number
    },
    related_ids: {
        type: Array
    },
    upsell_ids: {
        type: Array
    },
    cross_sell_ids: {
        type: Array
    },
    parent_id: {
        type: Number
    },
    purchase_note: {
        type: String
    },
    categories: {
        type: Array
    },
    tags: {
        type: Array
    },
    images: {
        type: Array
    },
    attributes: {
        type: Array
    },
    default_attributes: {
        type: Array
    },
    variations: {
        type: Array
    },
    grouped_products: {
        type: Array
    },
    menu_order: {
        type: Number
    },
    meta_data: {
        type: Array
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

// var MetaDataProductSchema = new Schema({
//     // name: {
//     //     type: String,
//     //     required: 'Please fill a Product name',
//     // },
//     key: {
//         type: String,
//     },
//     value: {
//         type: String,
//     },


//     created: {
//         type: Date,
//         default: Date.now
//     },
//     updated: {
//         type: Date
//     },
//     createby: {
//         _id: {
//             type: String
//         },
//         username: {
//             type: String
//         },
//         displayname: {
//             type: String
//         }
//     },
//     updateby: {
//         _id: {
//             type: String
//         },
//         username: {
//             type: String
//         },
//         displayname: {
//             type: String
//         }
//     }
// });

mongoose.model("Product", ProductSchema);