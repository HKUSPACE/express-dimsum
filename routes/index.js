var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');

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
    var form = new formidable.IncomingForm();
    var photoFilename = "";
    form.uploadDir = "./public/uploads";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        photoFilename = files.photo.name;
        fs.rename(files.photo.path, './public/uploads/'+files.photo.name, function(err) {
            if (err)
                throw err;
              console.log('renamed complete');  
            }
        );
        new Todo({
            content : fields.content,
            stock : fields.stock,
            price : fields.price,
            photo : files.photo.name,
            updated_at  : Date.now()
        }).save(function(err, todo, count){
            res.redirect('/');
        });
        
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