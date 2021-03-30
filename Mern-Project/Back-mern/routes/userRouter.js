const router= require('express').Router()
const { getUser } = require('../controllers/userCtrl')
const userCtrl = require('../controllers/userCtrl')
const auth =require('../middleWare/auth')

router.post('/register',userCtrl.register)

router.post('/login',userCtrl.login)

router.get('/logout',userCtrl.logout)

router.get('/refresh_token',userCtrl.refreshToken)

router.get('/info',auth,userCtrl.getUser)

router.patch('/addcart',auth,userCtrl.addCart)

module.exports=router