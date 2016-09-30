var mongoose=require('mongoose')
var movieSchema=require('../schemas/movie')

var Movie=mongoose.model('movie',movieSchema);
module.exports=Movie