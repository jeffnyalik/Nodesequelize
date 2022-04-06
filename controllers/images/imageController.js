const fs = require('fs')
const db = require('../../models/index')

const Image = db.images;

const uploadFiles = async (req, res) =>{
    try{
        console.log(req.file);
        if(req.file == 'undefined'){
            return res.status(400).send({message: 'you must select a file'})
        }
        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/resources/static/assets/uploads/" + req.file.filename
            ),
        }).then((image) =>{
            fs.writeFileSync(
                __basedir + "/resources/static/assets/tmp/" + image.name,
                image.data
            );

            return res.send("File has been uploaded successfully")
        })
    } catch(error){
        console.log(error)
        res.status(400).send(`Error when trying to upload file ${error}`)
    }
}

module.exports = {
    uploadFiles,
};