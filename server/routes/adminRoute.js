import express from 'express'
import {
  allChats,
  allUsers,
  getAdminData,
  getDashboardStats,
  logoutAdmin,
  verifyAdmin,
} from '../controllers/adminController.js'
import { adminLoginValidator, validateHandler } from '../utils/validators.js'
import { isAuthenticatedAdmin } from '../middlewares/auth.js'

const router = express.Router()

router.post('/verify', adminLoginValidator(), validateHandler, verifyAdmin)
router.post('/logout', logoutAdmin)

router.use(isAuthenticatedAdmin)

router.get('/users', allUsers)
router.get('/chats', allChats)
router.get('/stats', getDashboardStats)

router.get('/', getAdminData)

export default router
