const Options = require('../models/Options');

// Logic to create an option
module.exports.create = async function(req, res){
  
    try {
        const optionText = req.body.text;

        const options = await Options.find({question: req.params.questionId});
        if(options.length > 4){
            return res.status(500).json({
                message: 'Cannot add more than 5 options in a question'
            });
        }
        
        const newOption = new Options({ optionText, question: req.params.questionId });
        await newOption.save();
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}

// Logic to delete an option
module.exports.delete = async function(req, res){
  
    try {
        const option = await Options.findById(req.params.id);
        
        if(option.votes > 0){
            return res.status(500).json({
                message: 'Cannot delete an option containing a single vote'
            });
        }
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }
        await Options.findByIdAndDelete(req.params.id);
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}

// Logic to add vote to an option
module.exports.addVote = async function(req, res){
  
    try {
        const option = await Options.findById(req.params.id);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }
        option.votes += 1;
        await option.save();
        res.redirect('/');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  
}