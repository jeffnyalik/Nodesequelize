const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;


const db = require('./models/index');
db.sequelize.sync(); //normal sync with the database

//Drop and rebuild database
// db.sequelize.sync({force: true});

// adding a new column without affecting the existing data set
// db.sequelize.sync({force: false, alter:true});

const tutorialRouter = require('./routes/tutorials/tutorial_route');
const commentRouter = require('./routes/comments/comments_route');

app.use('/api/tutorials', tutorialRouter);
app.use('/api/comments', commentRouter);

app.use(cors);
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) =>{
    res.send("HOWNDY")
})

app.listen(port, () =>{
    console.log("App is running on port: 3000");
});