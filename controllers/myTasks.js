const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');
const Task = require('../models/tasks');
const { cloudinary } = require('../cloudinary')

var moment = require('moment'); // require



module.exports.getTasks = catchAsync(async (req, res) => {
  const { user } = req.params;
  const theUser = await User.find({ username: user }).populate('task');
  const u = theUser[0];
  res.render('Pages/main', { u });

});

module.exports.createTask = catchAsync(async (req, res) => {
  const { user } = req.params;
  const { task } = req.body;

  
  

  const theUser = await User.find({ username: user });
  const newTask = new Task({ 
    task,
    moment : moment().format("dddd, MMM Do YYYY, h:mm a")

   });
  theUser[0].task.push(newTask);
  await newTask.save()
  await theUser[0].save();
  req.flash('success', 'Task added');

  res.redirect(`/mytasks/${user}`);

})


module.exports.deleteTask = catchAsync(async (req, res) => {
  const { user, taskID } = req.params;
  await User.findOneAndUpdate({ username: user }, { $pull: { task: taskID } });
  await Task.findByIdAndDelete(taskID);
  req.flash('success', 'Task deleted');

  res.redirect(`/mytasks/${user}`);
})




module.exports.renderCustom = catchAsync(async (req, res) => {
  const { user } = req.params;
  const theUser = await User.find({ username: user });
  const u = theUser[0]

  res.render(`Pages/custom`, { u });
})


module.exports.applyCustom = catchAsync(async (req, res) => {
  const { user } = req.params;


  if (req.file) {
    const theUser = await User.find({ username: user });
    theUser[0].backgroundImage = req.file.path
    theUser[0].backgroundFilename = req.file.filename

    theUser[0].save()
  }


  res.redirect(`/mytasks/${user}`);


})


module.exports.deleteBgImage = catchAsync(async (req, res) => {
  const { user } = req.params;
  const theUser = await User.find({ username: user });
  const fileName = theUser[0].backgroundFilename;
  await cloudinary.uploader.destroy(fileName);
  await User.updateOne({ username: user }, { $unset: { backgroundImage: "" } })
  await User.updateOne({ username: user }, { $unset: { backgroundFilename: "" } })

  res.redirect(`/mytasks/${user}/custom`);


})

