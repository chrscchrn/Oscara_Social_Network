const db = require("../models");

module.exports = {
    
    add: (req, res) => {
        db.User.create({
            email: req.body.email,
            handle: req.body.handle,
            bio: req.body.bio,
            location: req.body.location
        }).then((response) => {
            res.status(200).json(response);
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: 'add user error'});
        });
    },

    getByEmail: (req, res) => {
        db.User.findOne({ 
            where: { email: req.params.email } 
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        });
    },
    
    getByHandle: (req, res) => {
        db.User.findOne({ 
            where: { handle: req.params.handle } 
        }).then((dbUser) => {
            console.log(dbUser)
            res.json(dbUser);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        });
    }

};