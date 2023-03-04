
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users');


module.exports.renderRegister = catchAsync(async (req, res) => {
    res.render('user/register');
});


module.exports.renderLogin = catchAsync(async (req, res) => {
    res.render('user/login');
})


module.exports.registerUser = catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const newUser = await User.register(user, password);

        req.login(newUser, function (err) {
            if (err) { return next(err); }

            req.flash('success', 'welcome to your new account');
            res.redirect(`/myTasks/${newUser.username}`);
        });


    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
})


module.exports.loginUser = catchAsync(async (req, res) => {
    req.flash('success', 'Welcome back to your account !')
    res.redirect(`/mytasks/${req.user.username}`)
})


module.exports.logoutUser = catchAsync(async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'logged out !')
        res.redirect('/')
    });

})