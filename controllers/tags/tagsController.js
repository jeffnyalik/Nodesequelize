const db = require('../../models/index');
const Tag = db.tags


const createTag = ((req, res) =>{
    if(!req.body.name){
        res.status(400).send({message: "name can not be blank"});
        return
    }

    const tag = {
        name: req.body.name
    }

    Tag.create(tag).then(tag => {
        res.status(201).send(tag)
        console.log(tag)
    }).catch(error => {
        res.status(500).send({message: message.error || "An error has occured"});
        console.log(error)
    })
})

module.exports = {
    createTag,
}