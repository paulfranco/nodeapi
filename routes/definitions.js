var router = require('express').Router();
var Definition = require('../models/definition');

// get all definitions by user
router.get('/', (requestAnimationFrame, res) => {
    Definition.find({owner: req.user}).then((definitions) => {
        res.json(definitions);
    });
});

// create a new definition
router.post('/', (req, res) => {
    var def = new Definition({
        owner: req.user,
        logType: req.body.definition.type,
        description: req.body.definition.description
    });
    def.save().then((definition) => {
        res.json({
            message: 'saved',
            definition: definition
        });
    });
});

// update an existing definition
router.put('/:id', (req, res) => {
    Definition.findOne({_id: req.params.id, owner: req.user})
    .then((definition) => {
        definition.logType = req.body.definition.type;
        definition.description = req.body.definition.description;

        definition.save().then((definition) => {
            res.json({
                message: 'updated',
                definition: definition
            });
        });
    });
});

// delete a definition
router.delete('/:id', (req, res) => {
    Definition.findOne({_id: req.params.id, owner: req.user})
    .then((definition) => {
        definition.remove().then(() => {
            res.json({
                message: 'deleted',
                definition: definition
            });
        });
    });
});

module.exports = router;