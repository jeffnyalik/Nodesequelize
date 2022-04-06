const { comments } = require('../../models/index');
const db = require('../../models/index');
const Comment = db.comments;


const createComment = ((req, res) => {
    //check for validation here
    if(!req.body.name){
        res.status(400).send({
            message: 'The name field can not be empty'
        });

        return
    }

    const tutorialId = req.body.tutorialId

    const comment = {
        name: req.body.name,
        text: req.body.text,
        tutorialId: tutorialId
    }

    Comment.create(comment).then(data =>{
        console.log(data);
        res.status(201).send(data);
    }).catch(error => {
        console.log(error);
        res.status(400).send({
            message: error.message || "An error occured"
        });

    })
});


const getAllComments = (req, res) =>{
    Comment.findAll({}).then(comments =>{
        console.log(comments)
        res.status(200).send(comments)
    }).catch(error => {
        console.log(error)
        res.status(500).send({message: "An error has occured"});
    });
}

//Get the comments for the given comment id
const singleComment = (req, res) => {
    const id = req.params.id
    Comment.findByPk(id, {include: ['tutorial']}).then(comment => {
        if(comment){
            res.status(200).send(comment);
            console.log(comment);
        }else{
            res.status(400).send(`Can not find comment for ID=${id}`);
            console.log('Comment with the ID does not exist');
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send({message: "There is an error"})
    });
}

module.exports = {
    createComment,
    getAllComments,
    singleComment,
}