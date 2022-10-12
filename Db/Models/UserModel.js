const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userScheme = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
      
       },
    cpassword:{
        type:String,
        required:true
      
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
                
            }
        }
    ]
})


userScheme.methods.generateJwtoken = async function(){
    let token = jwt.sign({_id:this._id},"00000000000000000000000000000000");
    console.log('token is',token)
    this.tokens = this.tokens.concat({token:token});
    this.save().then(res=>{
        console.log(res)
    }).catch(err=>console.log(err))

    
   
    return token;
}




const User = mongoose.model('User',userScheme);

module.exports = User;