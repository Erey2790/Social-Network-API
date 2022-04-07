const { Thought, User } = require('../models');

const thoughtController = {
    // the functions will go in here as methods
    // get all thought
    getAllThought(req, res) {
        Thought.find({})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },


      // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbUserData => {
        // If no thought is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createThought
  // add thought to user
  createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData => {
        User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.status(400).json(err));
},

  // update thought by id
updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },


  // delete thought
  deleteThought({ params }, res) {
    // delete the thought
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id'});
            return;
        }
        // delete the reference to deleted thought in user's thought array
        User.findOneAndUpdate(
            { username: dbThoughtData.username },
            { $pull: { thoughts: params.id } }
        )
        .then(() => {
            res.json({message: 'Successfully deleted the thought'});
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
},
};

module.exports = thoughtController;