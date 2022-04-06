const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addfriend,
    deletefriend
  } = require('../../controllers/user-controller');

// Set up GET all and POST at /api/user
router
router
.route('/')
.get(getAllUser)
.post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);



router
.route('/:id/friends/:friendId')
.post(addfriend)
.delete(deletefriend);



module.exports = router;