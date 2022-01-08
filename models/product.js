const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const product = new mongoose.Schema(
    {
        productId:{
            type: Schema.Types.ObjectId,
            required: true,
        },

        title: {
            type: string,
            required: true,
        },
        price: {
            type: Decimal128,
            required: true,
        },

        description: {
            type: string,
            required: true,
        },

    }
)

const Product = mongoose.model('Product', product);
module.exports = Product