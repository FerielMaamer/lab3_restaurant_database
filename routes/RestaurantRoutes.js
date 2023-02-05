const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();


//Delicatessen
  /* restaurantModel.create(
    [{"cuisine": "french","name": "Le Coin","city": "Toronto","restaurant_id": 123},
    {"cuisine": "italian","name": "Grazie","city": "Toronto","restaurant_id": 124},
    {"cuisine": "english","name": "Top Fries","city": "Vancouver","restaurant_id": 125,},
    {"cuisine": "Delicatessen","name": "Oasis","city": "Brooklyn","restaurant_id": 130,},
    {"cuisine": "french","name": "Nord Lyon","city": "Toronto","restaurant_id": 131,},
    {"cuisine": "Delicatessen","name": "Royalties","city": "New York","restaurant_id": 132,},
    {"cuisine": "Delicatessen","name": "Ceviche","city": "Toronto","restaurant_id": 133,},
    {"cuisine": "tunisian","name": "Brik","city": "Tunis","restaurant_id": 134,}]
)   */

//not asked for
/* app.post('/restaurants', async (req, res)=> {
    const restaurant = new restaurantModel(req.body);
    try {
      await restaurant.save((err) => {
        if(err){
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
}) */


/* 5.	Create REST API to return all restaurant details by cuisine
-	Select all the columns

http://localhost:3000/restaurants/cuisine/Japanese
http://localhost:3000/restaurants/cuisine/Bakery
http://localhost:3000/restaurants/cuisine/Italian */

app.get('/restaurants/cuisine/:cuisine', async(req, res)=>{
    try{
        const restaurant = await restaurantModel.findOne({cuisine:req.params.cuisine})
        res.send(restaurant)
    }catch(err){
        res.status(500).send(err)
    }
})

/* 6.	Create REST API to return the 
-	The selected columns must include id, cuisines, name, city, resturant_id
-	The sorting by the restaurant_id in Ascending or Descending Order based on parameter passed.

http://localhost:3000/restaurants?sortBy=ASC
http://localhost:3000/restaurants?sortBy=DESC */

app.get('/restaurants', async (req, res) => {
    try{
        //console.log("hello world")
        //let sortBy = req.query.sortBy
        const restaurant = await restaurantModel.find().sort({"restaurant_id": req.query.sortBy})
        res.send(restaurant)
    }catch(err){
        res.status(500).send(err)
    }
})


/* 7.	Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
-	The selected columns must include cuisines, name and city, but exclude id
-	The sorting order must be Ascending Order on the name

http://localhost:3000/restaurants/Delicatessen  */

app.get('/restaurants/Delicatessen', async(req, res)=>{
    
    try{
        let query = {
            cuisine:"Delicatessen", 
            city:{$ne:"Brooklyn"}
        }
        const restaurant = await restaurantModel.find(query).sort({"name":1}).select('-_id')
        res.send(restaurant)
    }catch(err){
        res.status(500).send(err)
    }

})

/*  4.	Create REST API to return all restaurant details
-	Select all the columns

http://localhost:3000/restaurants */

app.get('/restaurants', async(req, res)=>{
    console.log("first api")
    const restaurants = await restaurantModel.find({});
    try{
        res.status(200).send(restaurants);
    } catch (err){
        res.status(500).send(err);
    }
})

module.exports = app