import express from 'express'
import {
  getUserProfile,
  login,
  logout,
  newUser,
} from '../controllers/useController.js'
import { upload } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.post('/new', upload.single('avatar'), newUser)
router.post('/login', login)

// Authenticated Routes
router.use(isAuthenticated)
router.get('/profile', getUserProfile)
router.post('/logout', logout)
router.get('/search-user')

export default router
