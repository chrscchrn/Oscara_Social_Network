const db = require("../models");

module.exports = {

    getAll: (req, res) => {
        db.Post.findAll({
            order: [ ['createdAt', 'DESC'] ] 
        }).then(posts => {
            res.json(posts);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        });
    },

    newPost: (req, res) => {
        db.Post.create({
            body: req.body.body,
            likeCount: req.body.likeCount,
            replyCount: req.body.replyCount,
            UserId: req.body.UserId,
            handle: req.body.handle,
            image: req.body.image
        }).then((response) => {
            res.json(response);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        });
    },

    userPosts: (req, res) => {
        db.Post.findAll({
            where: {
              UserId: req.params.email
            },
            order: [ ['createdAt', 'DESC'] ]
        }).then(posts => {
            res.json(posts);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        });
    },

    remove: (req, res) => {
        db.Reply.destroy({
            where: {
              PostId: req.params.id,
            }
        }).then(dbReplies => {
            db.Like.destroy({
                where: {
                    PostId: req.params.id,
                }
        }).then(res2 => {
                db.Post.destroy({
                    where: {
                    id: req.params.id,
                    }
                }).then(dbPost => {
                    console.log(dbPost);
                    res.json(dbPost);
                }).catch(err => {
                    console.log(err);
                    res.status(400);
                    res.json(err);
                });
            }).catch(err => {
                console.log(err);
                res.status(400);
                res.json(err);  
            })
        }).catch(err => {
            console.log(err);
            res.status(400);
            res.json(err);
        })
    },    

    like: (req, res) => {
        let postData = {};
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        }).then( response => {
            if (response.dataValues) {
                postData = response.dataValues;
                db.Like.findOne({
                    where: {
                        PostId: req.params.id,
                        handle: req.params.handle,
                    }
                }).then( data => {
                    if (!data) {
                        db.Like.create({
                            PostId: req.params.id,
                            handle: req.params.handle,
                        }).then( result => {
                            postData.likeCount += 1;
                            let values = { likeCount: postData.likeCount } 
                            let selector = { where: { id: req.params.id } }
                        db.Post.update(values, selector)
                            .then( responseTwo => {
                                res.json(responseTwo);
                            }).catch(err => {
                                console.log(err);
                                res.status(500);
                                res.json(err);
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(500);
                            res.json(err);
                        })
                    } else {
                        res.json({ error: 'Post already liked'});
                        res.status(400);
                    }
                    }).catch(err => {
                        console.log(err);
                        res.json(err);
                        res.status(500);
                    })
            } else {
                res.json({ error: 'Post not found' })
                res.status(404)
            }
        }).catch(err => {
            console.log(err);
            res.json(err);
            res.status(500);
        })
    },

    reply: (req, res) => {
        let postData = {};
        db.Post.findOne({
            where: {
                id: req.body.postId,
            }
        }).then(postInfo => {
            postData = postInfo.dataValues;
            console.log(req.body.imageName);
            db.Reply.create({
                body: req.body.body,
                handle: req.body.handle,
                imageName: req.body.imageName,
                PostId: req.body.postId,
            }).then(() => {
                postData.replyCount += 1;
                let values = { replyCount: postData.replyCount } 
                let selector = { where: { id: req.body.postId } }
                db.Post.update(values, selector)
                .then(responseTwo => {
                    res.json(responseTwo);
                }).catch(err => {
                    console.log(err);
                    res.status(500);
                });
            }).catch(err => {
                console.log(err);
                res.status(500);
                res.json(err);
            });
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        })
    },
    
    getReplies: (req, res) => {
        db.Reply.findAll({
            where: {
                postId: req.params.id
            }
        }).then(resp => {
            res.json(resp);
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
        })
    }
};