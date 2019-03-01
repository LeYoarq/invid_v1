const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIntroPage);

// raiz => GET
router.get('/main', adminController.getShortfilmEnabled);
router.post('/main', adminController.postLogin); //ok

// /upload => POST


router.get('/register/post', adminController.getLoginRegister); //ok
router.post('/register/post', adminController.postRegister); //ok
router.get('/register/upload/:user_id', adminController.getAddFilm); //ok
router.post('/register/upload/:user_id', adminController.postAddFilm); //ok





// /user => GET/POST
router.get('/admin', adminController.getLoginAdmin); //ok
router.post('/admin/film', adminController.postLoginAdmin); //ok
router.post('/admin/film/delete/:id', adminController.postDeleteFilm); //ok
router.post('/admin/film/enable/:id', adminController.postEnableFilm); //ok
router.post('/admin/film/disable/:id', adminController.postDisableFilm); //ok


module.exports = router; 