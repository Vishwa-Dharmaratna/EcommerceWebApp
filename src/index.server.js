const express=require('express');
//const env=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');

//env.config();

//mongodb connection
//mongodb+srv://projectX:<password>@cluster0.ngyyy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
                "mongodb+srv://vishwadb:1996vishwa@cluster0.1mwnf.mongodb.net/ecommerce?retryWrites=true&w=majority", 
                {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true,
                    useCreateIndex:true 
                }
        ).then(()=>{
            console.log('database connected')
        })


    

    

    app.use(bodyParser());
    app.use('/api',authRoutes);
    app.use('/api',adminRoutes);


{/*app.get('/',(req,res,next)=>{

    res.status(200).json({
        message:'hello from server'
    });

});



app.post('/data',(req,res,next)=>{

    res.status(200).json({
        message:req.body
    });

});
*/}
app.listen(3000,()=>{

console.log('server is running on port 3000');
});
