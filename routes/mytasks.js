if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()

}



const express = require('express')
const route = express.Router({ mergeParams: true })

const { isLoggedIn, isAuthor, validateTask } = require('../MIDDLEWARE');
const taskController = require('../controllers/myTasks')



const multer = require('multer')
const { storage } = require('../cloudinary')

const upload = multer({ storage })


route.get(`/mytasks/:user`, isLoggedIn, isAuthor, taskController.getTasks)

route.post('/mytasks/:user', isLoggedIn, isAuthor, validateTask, taskController.createTask);


route.delete('/mytasks/:user/custom', isLoggedIn, isAuthor, taskController.deleteBgImage);

route.delete('/mytasks/:user/:taskID', isLoggedIn, isAuthor, taskController.deleteTask);

// CUSTOM

route.get('/mytasks/:user/custom', isLoggedIn, isAuthor, taskController.renderCustom);

route.post('/mytasks/:user/custom', isLoggedIn, isAuthor, upload.single('background_image'), taskController.applyCustom);


module.exports = route