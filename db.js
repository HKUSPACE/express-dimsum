var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
    user_id : String,
    content : String,
    stock : Number,
    price : Number,
    updated_at  : Date
});

mongoose.model('Todo', Todo);
mongoose.connect('mongodb://localhost/express-todo');