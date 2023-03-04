const User = require('./models/users')
const {taskSchema} = require('./JOISchema')
const ExpressError = require('./utils/ExpressError');




module.exports.validateTask =(req, res, next) => {

const user = req.params

  const { error } = taskSchema.validate(req.body)
  if (error) {
    const msg = error.details.map(el => el.message).join(',')
    console.log(msg)
    req.flash('error', msg)
    res.redirect(`/mytasks/${user}`)

  } else {
    next()
  }
}


module.exports.isLoggedIn = (req, res, next) => {

  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be signed in first');
    return res.redirect('/login');
  }
  next()
}


module.exports.isAuthor = async (req, res, next) => {
  const { user } = req.params
  const newUser = await User.find({ username: user })


    if(!newUser[0] || !newUser[0].equals(req.user)){
      req.flash('error',"You don't have permission to do that !")
      return res.redirect(`/myTasks/${req.user.username}`);

  }
  
  next()
}