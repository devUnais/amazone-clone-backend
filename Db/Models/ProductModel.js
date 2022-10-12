const mongoose = require('mongoose')


const productScheme = mongoose.Schema({
    productImage:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true

    },
    productDesc:{
          type:String,
          required:true
        },
    productPrice:{
        type:Number,
        required:true
          
        },
    productIndex:{
        type:Number,
        required:true
              
        }
    
    
})

const Products = mongoose.model('products',productScheme);



module.exports = Products;