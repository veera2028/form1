var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
})

      /*  conn.connect(function(err){
            if(err){
                console.log('db connection failed');
            }else{
                console.log('db connection established');
            }
        })
       */ 
module.exports = conn;