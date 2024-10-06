import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import {
  addNewMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getUserChats,
  getUserGroupChats,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachments,
} from '../controllers/chatController.js'
import { upload } from '../middlewares/multer.js'
import {
  addMemberValidator,
  newGroupValidator,
  removeMemberValidator,
  validateHandler,
  chatIdValidator,
  sendAttachmentsValidator,
} from '../utils/validators.js'

const router = express.Router()

// Authenticated Routes
router.use(isAuthenticated)

router.post('/new-group', newGroupValidator(), validateHandler, newGroupChat)
router.get('/all-chats', getUserChats)
router.get('/all-group-chats', getUserGroupChats)
router.post(
  '/add-new-member',
  addMemberValidator(),
  validateHandler,
  addNewMembers
)
router.post(
  '/remove-member',
  removeMemberValidator(),
  validateHandler,
  removeMembers
)
router.post('/leave-group/:id', chatIdValidator(), validateHandler, leaveGroup)
router.post(
  '/send-attachments',
  upload.array('files', 5),
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
)

router
  .route('/:id', chatIdValidator(), validateHandler)
  .get(getChatDetails)
  .put(renameGroup)
  .delete(deleteChat)

router.get('/messages/:id', chatIdValidator(), validateHandler, getMessages)

export default router
