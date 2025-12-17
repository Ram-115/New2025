const mongoose = require('mongoose');

const ProductSchema= new mongoose.Schema({
    ProductName:String,
    Price:Number,
    ProductImage:String,
    Description:String,
    Category:String,
    Stock:Number,
},{
    collection: "Products"
})

module.exports = mongoose.model('products',ProductSchema)