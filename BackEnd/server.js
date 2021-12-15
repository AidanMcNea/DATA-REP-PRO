const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');

//using cors to allow the get, post, put, delete to work
app.use(cors());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//useing mongoose to contact the database
const mongoose = require('mongoose');

//url to connect to my database
const strConnection = 'mongodb+srv://admin:admin@cluster0.q7ymj.mongodb.net/restaurantReviewer?retryWrites=true&w=majority'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(strConnection);
}

//my schema passing it to the same schema in my DB
const reviewSchema = new mongoose.Schema({
RestaurantName:String,
         Rating:String,
         Picture:String,
         Review:String
     });

     //cluster called reviews
     const reviewModel = mongoose.model('reviews', reviewSchema);

app.post('/api/reviews', (req,res)=>{
        console.log(req.body);
        console.log(req.body.RestaurantName);
        console.log(req.body.Picture);
        console.log(req.body.Rating);
        console.log(req.body.Review);
    
        reviewModel.create({
            RestaurantName:req.body.RestaurantName,
            Rating:req.body.Rating,
            Picture:req.body.Picture,
            Review:req.body.Review
        });
        res.send('Data Sent to Server!')
    })
    
    app.get('/api/reviews/:id',(req, res)=>{
        console.log(req.params.id);
    
        reviewModel.findById(req.params.id,(error,data)=>{
            res.json(data);
        })
    })
    
    app.delete('/api/reviews/:id', (req, res)=>{
        console.log('Deleteing : '+req.params.id);
    
        reviewModel.deleteOne({_id:req.params.id},
            (error, data)=>{
                if(error)
                    res.send(error)//need status error 200
                res.send(data);
            })
     })
    
     app.put('/api/reviews/:id',(req, res)=>{
        console.log('update');
         console.log(req.body);
         console.log("Updating: " + req.params.id);
    
         reviewModel.findByIdAndUpdate(req.params.id, req.body, {new:true},
            (err,data)=>{
                 res.send(data);
          })
    
     })
    
    
    
     app.get('/api/reviews', (req, res) => {
        reviewModel.find((err, data)=>{
            res.json(data);
        })
          
     })



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})