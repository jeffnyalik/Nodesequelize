const multer = require('multer');
const imageFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }else{
        cb('Please upload an image', false)
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + "/resources/static/assets/uploads/");
    },

    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-agency-${file.originalname}`);
    },
    
});

const uploadFile = multer({storage: storage, imageFilter: imageFilter});
module.exports = uploadFile