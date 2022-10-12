const express = require('express');
const port = 5050
const mongoose = require('mongoose');
const User = require('./Db/Models/UserModel');
const Products = require('./Db/Models/ProductModel')
const cors = require('cors');
const { json } = require('express');
const stripe = require('stripe')('sk_test_51K1RFYSFF9tufBsc1jK4kDWK0cVA6K34x6TZ2Pd4OpM6ZlxdyLigy9b4RmXy34d2FvRBqhWNvPKWQuvZ4SZ5OmPC00j3KArPAI');

const DB = "mongodb+srv://unais:unaisanoshali@cluster0.rabd2fx.mongodb.net/?retryWrites=true&w=majority"


// const DB = "mongodb://127.0.0.1:27017"



mongoose.connect(DB,{dbName:"amazoneCloneDb"}).then(()=>{
    console.log('Connected to the db')
}).catch(err=>{
    console.log(err);
})



const server = express();

 

server.use(cors());

server.use(json())

server.get('/',(re,res)=>{
     res.send('hello world')
})


server.post('/signup',(reQ,res)=>{

    const {password,cpassword,email} = reQ.body;
  
    User.findOne({email:email}).then(doc=>{
        if(doc == null){
            if(password == cpassword){
                const user = User(reQ.body);
                user.save().then(()=>{
                    console.log('Sved')
                    res.send({msg:"account created"})
                }).catch(err=>{
                    console.log(err)
                    res.send(err);
                })
            }
            else{
                res.send({msg:"password and cpassword does not match"})
            }
     
        }else{
            res.send({msg:"email already registerd"})

        }

    }).catch(err=>{
        res.send({msg:er})
        
    })
 

   

})

server.post('/login',(reQ,res)=>{
    

    const {email,password} = reQ.body

    User.findOne({email:email}).then(doc=>{
        doc.generateJwtoken().then(token=>{
            if(doc.password == password){
    
                res.send({msg:"user Logged In",token:token,status:200})
            }
            else{
                res.send({msg:"no user found"})
            }

        }).catch(err=>console.log('err'));


 
    }).catch(err=>{
        res.send({msg:"no user found"})
    })
})

server.get('/Product',(reQ,res)=>{
    Products.find().then(doc=>{
        console.log(doc);
        res.send(doc)
      }).catch(err=>console.log(err))
})

server.post('/create_paymentIntent', async (reQ,res)=>{
       const paymentIntent = await stripe.paymentIntents.create({
            amount:20,
            currency:'usd',
            description: 'Software development services',
            shipping: {
              name: 'Jenny Rosen',
              address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
              },
            },
         
            payment_method:'pm_card_visa'
        })

        
        res.status(200).send({client_secret:paymentIntent.client_secret});

})
 
server.listen(port,()=>{
    console.log('server running on port',port);    
})