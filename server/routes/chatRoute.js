import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { newGroupChat } from '../controllers/chatController.js'

const router = express.Router()

// Authenticated Routes
router.use(isAuthenticated)

router.post('/new-group', newGroupChat)

export default router
