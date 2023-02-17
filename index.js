var conn = require('./connection');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',function(req, res){
    res.sendFile(__dirname+'/home.html');
})
app.post('/save',function(req, res){
    //console.log(req.body);
    var name = req.body.name;
    conn.connect(function(err){
        if(err) console.log(err);
        var sql ="INSERT INTO `table_1`(Name) VALUES ('"+name+"')";
        conn.query(sql,function(err, result){
            if(err) console.log(err);
            res.send('record created successfully');
        })
    })
})
app.get('/view',function(req, res){
    conn.connect(function(err){
        if(err) console.log(err);
        var sql ="SELECT * FROM table_1";
        conn.query(sql,function(err, result){
            if(err) console.log(err);
            res.render(__dirname+'/view',{data:result});
        })
    })   
})
app.get('/edit-record',function(req, res){
    var id = req.query.id;
    conn.connect(function(err){
        if(err) console.log(err);
        var sql ="SELECT * FROM `table_1` WHERE id=?";
        conn.query(sql,[id],function(err, result){
            if(err) console.log(err);
            res.render(__dirname+'/edit-record',{data:result})
        })
    })
})
app.post('/edit-record',function(req, res){
    var id = req.body.id;
    var name = req.body.name;
    conn.connect(function(err){
        if(err) console.log(err);
        var sql ="UPDATE table_1 SET Name='"+name+"' WHERE id=?";
        conn.query(sql,[id],function(err, result){
            res.redirect('/view');
        })
    })
})
app.listen(7000);