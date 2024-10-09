import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import {
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/reducer/misc'
import { useRef } from 'react'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/query/api'

const FileMenu = ({ anchorEl, chatId }) => {
  const dispatch = useDispatch()
  const { isFileMenu } = useSelector((state) => state.misc)

  const [sendAttachments] = useSendAttachmentsMutation()

  const imageRef = useRef(null)
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const fileRef = useRef(null)

  const handleFileMenuClose = () => {
    dispatch(setIsFileMenu(false))
  }

  const selectRef = (ref) => {
    ref.current.click()
  }

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files)

    if (files.length <= 0) return

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time`)

    dispatch(setUploadingLoader(true))

    const toastId = toast.loading(`Sending ${key}...`)
    handleFileMenuClose()

    try {
      const myForm = new FormData()

      myForm.append('chatId', chatId)
      files.forEach((file) => myForm.append('files', file))

      const res = await sendAttachments(myForm)

      if (res.data) toast.success(`${key} sent successfully`, { id: toastId })
      else toast.error(`Failed to send ${key}`, { id: toastId })
    } catch (error) {
      toast.error(error, { id: toastId })
    } finally {
      dispatch(setUploadingLoader(false))
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={isFileMenu}
      onClose={handleFileMenuClose}
      elevation={2}
    >
      <div style={{ width: '10rem' }}>
        <MenuList>
          <MenuItem onClick={(e) => selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: 'none' }}
              onChange={(e) => fileChangeHandler(e, 'Images')}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={(e) => selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Videos</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: 'none' }}
              onChange={(e) => fileChangeHandler(e, 'Videos')}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={(e) => selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mp3, audio/wav"
              style={{ display: 'none' }}
              onChange={(e) => fileChangeHandler(e, 'Audios')}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={(e) => selectRef(fileRef)}>
            <Tooltip title="Document">
              <FileIcon />
            </Tooltip>
            <ListItemText style={{ marginLeft: '0.5rem' }}>
              Documents
            </ListItemText>
            <input
              type="file"
              multiple
              accept="application/pdf, application/msword"
              style={{ display: 'none' }}
              onChange={(e) => fileChangeHandler(e, 'Documents')}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  )
}

export default FileMenu
