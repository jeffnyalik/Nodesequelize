const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOption = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOption));
// const bodyParser = require("body-parser"); deprecated 
const port = 3000;
global.__basedir = __dirname


const db = require('./models/index');
// db.sequelize.sync(); //normal sync with the database

// adding a new column / table without affecting the existing data set
db.sequelize.sync({force: false, alter:true});

const tutorialRouter = require('./routes/tutorials/tutorial_route');
const commentRouter = require('./routes/comments/comments_route');
const tagRouter = require('./routes/tag/tag_route');
const imageRouter = require('./routes/images/images_route');
const roleRouter = require('./routes/roles/roles_route');

app.use('/api/tutorials', tutorialRouter);
app.use('/api/comments', commentRouter);
app.use('/api/tags', tagRouter);
app.use('/api/images', imageRouter);
app.use('/api/roles', roleRouter);

app.use(cors);
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) =>{
    res.send("HOWNDY")
})

app.listen(port, () =>{
    console.log("App is running on port: 3000");
});