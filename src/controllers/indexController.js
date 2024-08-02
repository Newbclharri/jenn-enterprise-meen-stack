exports.sendIndexView = function (req, res){
    res.locals = {
        title: `Jenn\'s Landing Root`,
        message: 'Welcome to Jenn\'s Landing!'
    }

    res.render('index', {
        stylesheet: '/assets/styles/index.css'
    });
}