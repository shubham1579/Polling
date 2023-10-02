const Questions = require('../models/Questions');
const Options = require('../models/Options');

// Logic for rendering the home page
module.exports.home = async function(req, res){

    try{
        const questions = await Questions.find({});
        const options = await Options.find({});

        res.render('home', {
            questions,
            options
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

}