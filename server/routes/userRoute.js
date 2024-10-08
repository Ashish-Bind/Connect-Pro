import express from 'express'
import {
  getAllNotifications,
  getUserProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from '../controllers/userController.js'
import { upload } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/auth.js'
import {
  loginValidator,
  registerValidator,
  validateHandler,
  sendRequestValidator,
  acceptRequestValidator,
} from '../utils/validators.js'

const router = express.Router()

router.post(
  '/new',
  upload.single('avatar'),
  registerValidator(),
  validateHandler,
  newUser
)
router.post('/login', loginValidator(), validateHandler, login)

// Authenticated Routes
router.use(isAuthenticated)
router.get('/profile', getUserProfile)
router.post('/logout', logout)
router.get('/search-user', searchUser)
router.put(
  '/send-request',
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
)
router.put(
  '/accept-request',
  acceptRequestValidator(),
  validateHandler,
  sendFriendRequest
)
router.get('/all-notifications', getAllNotifications)

export default router
