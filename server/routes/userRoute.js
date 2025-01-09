import express from 'express'
import {
  acceptFriendRequest,
  getAllFriends,
  getAllNotifications,
  getUserProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from '../controllers/userController.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { upload } from '../middlewares/multer.js'
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
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
  acceptFriendRequest
)
router.get('/all-notifications', getAllNotifications)
router.get('/all-friends', getAllFriends)

export default router
