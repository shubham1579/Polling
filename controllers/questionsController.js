const Questions = require('../models/Questions');
const Options = require('../models/Options');

// Logic to create a question
module.exports.Create = async function(req, res){

    try {

        const text = req.body.text;
        const newQuestion = new Questions({ questionText: text });
        await newQuestion.save();
        res.redirect('/');
  
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}

// Logic to delete a question and all associated options to it
module.exports.delete = async function(req, res){
  
    try {
        const question = await Questions.findById(req.params.id);
    
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const options = await Options.find({ question: req.params.id });

        for (const option of options) {
            if (option.votes > 0) {
                return res.status(400).json({
                    message: 'Question cannot be deleted as one of its options has votes.',
                });
            }
        }
    
        await Options.deleteMany({question: req.params.id});
        await Questions.findByIdAndDelete(req.params.id);
    
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}

// Logic to view the question
module.exports.question = async function(req, res){
  
    try {
        const question = await Questions.findById(req.params.id);
        const options = await Options.find({question: req.params.id});
        
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
    
        res.render('question', {
            title: 'Question',
            question: question,
            options : options
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}