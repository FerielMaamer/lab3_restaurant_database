//id, cuisines, name, city, resturant_id

const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    cuisine:{
        type:String
    },
    name:{
        type:String
    },
    city:{
        type:String
    },
    restaurant_id:{
        type:Number
    }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;