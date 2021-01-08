const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./swagger.json');


//set up express app
const app=express();

//connect to mongodb
mongoose.connect('mongodb://localhost/mynoteapp',{ useNewUrlParser: true }, { useUnifiedTopology: true } );
mongoose.Promise=global.Promise;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//initialize route
app.use('/api',require('./routes/api'));

//error handling middlewear
app.use(function(err,req,res,next){
 res.status(422).send({error:err.message});
});


//listen for requests
app.listen(process.env.port||4000,function(){
  console.log('now listening for requests');
});
