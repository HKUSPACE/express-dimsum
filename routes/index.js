var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');

/* GET home page. */
router.get('/', function(req, res, next) {
    Todo.find(function(err, todos, count){
        res.render('index', { 
            title   : 'Express Todo Example',
            todos   : todos
        });
    });    
});

router.post('/create', function(req, res, next){
    new Todo({
        content : req.body.content,
        stock : req.body.stock,
        price : req.body.price,
        updated_at  : Date.now()
    }).save(function(err, todo, count){
        res.redirect('/');
    });
        
});

router.get('/destroy/:id', function(req, res, next){
    Todo.findById( req.params.id, function(err, todo){
        todo.remove(function(err, todo){
            res.redirect('/');
        });
    });
});

router.get('/edit/:id', function(req, res, next){
    Todo.find( function(err, todos){
        res.render('edit', {
            title   : 'Express Todo Example',
            todos   : todos,
            current : req.params.id
        });
    });
});

router.post('/update/:id', function (req, res){
    Todo.findById(req.params.id, function( err, todo){
        todo.content = req.body.content;
        todo.stock = req.body.stock;
        todo.price = req.body.price;
        todo.updated_at = Date.now();
        todo.save(function(err, todo, count){
            res.redirect('/');
        });
    });
});

module.exports = router;