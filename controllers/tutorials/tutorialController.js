const { json } = require('stream/consumers');
const db = require('../../models/index');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const createTutorial = ((req, res) =>{
    if(!req.body.title){
        res.status(400).send({
            message: 'The field can not be empty'
        });
        return
    }

    const tutorial = {
        title: req.body.title,
        age: req.body.age,
        description: req.body.description,
        published: req.body.published
    }

    Tutorial.create(tutorial).then(data =>{
        console.log(data);
        res.status(201).send(data);
    }).catch(error =>{
        res.status(500).send({
            message: error.message || "An error has occured"
        });
        console.log(error.message)
    })
})

//get all tutorials
const getTutorials = ((req, res) =>{
    Tutorial.findAll({}).then(data => {
        res.status(200).send(data);
    }).then(error => {
        res.status(400).send({message: error.message || "Failed to fetch data"})
    });
});

//get all tutorial with comments
const getTutorialsComments = ((req, res) =>{
    Tutorial.findAll({
        include: ['comments']
    }).then(tutorials => {
        console.log(tutorials);
        res.status(200).send(tutorials)
    }).catch(error => {
        console.log(error);
        res.status(400).send({
            message: error.message || "An error cocured"
        });
    })
})

//get tutorial by Id
const getTutotorialById = (req, res) =>{
    const id = req.params.id;
    Tutorial.findByPk(id).then(data =>{
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({message: `Can not find tutorial with id=${id}`});
        }
    }).catch(error =>{
        res.status(500).send({message: "can not find it=" + id});
        console.log(error);
    });
}

//find all published
const findPublishedTuts = (req, res) =>{
    Tutorial.findAll({
        where: {published: true}
    }).then(data => {
        res.status(200).send({message: data})
        console.log(data)
    }).catch(error =>{
        console.log(error);
        res.status(400).send({message: "An error has occured"})
    })
}

//update the body
const updateTutorial = (req, res) =>{
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: {
            id:id
        }
    }).then(num => {
        if(num ==1){
            res.status(201).send({message: "updated successfully"})
        }else{
            res.status(400).send({message: `Can not update tutorial with id=${id}`})
        }
    }).catch(error => {
        res.status(500).send({message: "Internal server error"});
        console.log(error);
    })
}

//delete tutorial
const deleteTutorial = (req, res) =>{
    const id = req.params.id;
    Tutorial.destroy({
        where: {
            id:id
        }
    }).then(num => {
        if(num == 1){
            res.status(201).send({message: "Deleted successfully"})
        }else{
            res.status(400).send({message: `Can not delete tutorial with id=${id}`})
        }
    }).catch(error => {
        res.status(500).send({message: "Internal server error"});
        console.log(error);
    })
}

// Delete all
const deleteAll = (req, res) =>{
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.status(201).send({message: "Deleted successfully"})
    }).catch(error => {
        res.status(500).send({message: "Internal server error"});
        console.log(error);
    })
}


module.exports = {
    getTutorials,
    getTutorialsComments,
    findPublishedTuts,
    getTutotorialById,
    updateTutorial,
    createTutorial,
    deleteTutorial,
    deleteAll
}