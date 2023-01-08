const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

router.get('/',controller.home);
router.get('/user/signin', controller.showSignIn);
router.get('/user/signup', controller.showSignUp);
router.get('/user/profile', passport.checkAuthentication ,controller.showProfile);
router.post('/user/create', controller.createUser);//registration of user
router.post('/user/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signin'},
),controller.createSession);
router.post('/user/add-post', controller.addPost);
router.get('/user/signout', controller.destroySession);

router.get('/user/delete-post', controller.delete_post);
router.get('/user/update-post', controller.update_post);
router.post('/user/modify-post', controller.modify_post);

router.get('/user/api', controller.getPosts);

module.exports = router;//external file can use it