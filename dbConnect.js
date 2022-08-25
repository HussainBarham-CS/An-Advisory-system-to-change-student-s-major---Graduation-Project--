const reader = require('xlsx')
const {Client} = require('pg')
const http = require('http')


  
//Connect database
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "11820602",
    database: "ANNU_DataBase"
})

client.connect();
if(client){
    console.log("DATABASE RUNNING...........")
}

module.exports = client;