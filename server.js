const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views","views")

const db = mysql.createConnection({
    host:"localhost",
    database:"datauser",
    user:"root",
    password:"",
    port:"3307"
})

db.connect((err) => {
    if(err) throw err
    console.log("data base ok")

    const sql ="SELECT * FROM data"
    db.query(sql, (err, result)=> {
     
        const user = JSON.parse(JSON.stringify(result))
        console.log('hasil data base :' , user)

        // untuk get data
        app.get("/" ,(req, res) => {
            res.render("index",{user : user})
        })


        // untuk insert data
        app.post("/tambah",(req, res)=>{
            const insertSql = `INSERT INTO data(nama, contact, umur) value('${req.body.nama}','${req.body.contact}','${req.body.umur}');`
            db.query(insertSql, (err, result)=>{
                if(err) throw err
                res.redirect("/");
            })
        })
    })

 
})



app.listen(8000, () => {
    console.log('server ready')
})