const mongoose = require('mongoose');
const AddtoCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ProductName: {
        type: String,
        required: true
    },
    ProductImage: {
        type: String,
        required: true
    },
    ProductPrice: {
        type: Number,
        required: true
    },
    ProductDescription: {
        type: String,
        required: true
    },

    totalQuantity: {
        type: Number,
        required: true
    }
},
    {
        collection: "addtocarts"
    }
);

module.exports = mongoose.model('addtocarts', AddtoCartSchema);