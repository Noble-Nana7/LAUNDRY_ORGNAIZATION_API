const multer = require('multer');

exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './assets')
        },
        filename: (req, file, cb) => {
            console.log('multer');

            const uniqueSuffix = new Date().getTime() + '-' + Math.round(Math.random() + 1E6)
            cb(null, file.filename + '-' + uniqueSuffix + '-' + file.mimetype.split('/')[1])
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Invalid Image Format'))
        } else { 
            cb(null, true)
        }
    }
})
