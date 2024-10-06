import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import {
  addNewMembers,
  getChatDetails,
  getUserChats,
  getUserGroupChats,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from '../controllers/chatController.js'
import { upload } from '../middlewares/multer.js'

const router = express.Router()

// Authenticated Routes
router.use(isAuthenticated)

router.post('/new-group', newGroupChat)
router.get('/all-chats', getUserChats)
router.get('/all-group-chats', getUserGroupChats)
router.post('/add-new-member', addNewMembers)
router.post('/remove-member', removeMembers)
router.post('/leave-group/:id', leaveGroup)
router.post('/send-attachments', upload.array('files', 5), sendAttachments)

router.route('/:id').get(getChatDetails).put(renameGroup).delete()

export default router
