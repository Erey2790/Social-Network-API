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
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thought: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
};

module.exports = thoughtController;