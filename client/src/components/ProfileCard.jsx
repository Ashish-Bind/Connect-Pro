import {
  CalendarMonth as CalendarIcon,
  CameraAlt,
  Delete as DeleteIcon,
  AlternateEmail as EmailIcon,
  Face as FaceIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material'
import { Avatar, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { primary, primaryDark } from '../constants/color'
import { useAsyncMutation } from '../hooks/customHooks'
import { useDeleteChatMutation } from '../redux/query/api'
import { setIsDeleteMenu } from '../redux/reducer/misc'
import ConfirmDialog from './dialogs/ConfirmDialog'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, member } = useSelector((state) => state.auth)
  const { isDeleteMenu } = useSelector((state) => state.misc)
  const location = useLocation()

  const isHome = location.pathname === '/'

  const [deleteChat, isDeleteChatLoading] = useAsyncMutation(
    useDeleteChatMutation
  )

  const openDeleteChatMenu = () => {
    dispatch(setIsDeleteMenu(true))
  }

  const handleDeleteChat = () => {
    deleteChat('Deleting Chat...', member?._id)
    dispatch(setIsDeleteMenu(false))
    navigate('/')
  }

  return member?.groupChat && !isHome ? (
    <Stack
      spacing={'2rem'}
      direction={'column'}
      alignItems={'center'}
      sx={{ padding: '1rem' }}
    >
      <Avatar
        sx={{
          width: '10rem',
          height: '10rem',
          objectFit: 'contain',
          border: `5px solid ${primary}`,
          marginBottom: '1rem',
        }}
        src={member.groupAvatar.url}
      />
      <ProfileCard
        text={'Group Name'}
        Icon={<GroupIcon />}
        heading={isHome ? user?.name : member?.name}
      />
      <ProfileCard
        text={'Created'}
        Icon={<CalendarIcon />}
        heading={moment(isHome ? user?.createdAt : member?.createdAt).fromNow()}
      />
      <Typography variant="body1" color="gray">
        {member.members.length} Members
      </Typography>
      <Stack
        spacing={'1rem'}
        alignItems={'center'}
        sx={{
          width: '100%',
          height: '80%',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
        }}
      >
        {member.members.map((i) => (
          <ProfileCard
            key={i._id}
            text={''}
            Icon={<PersonIcon />}
            heading={isHome ? user?.name : i?.name}
          />
        ))}
      </Stack>
    </Stack>
  ) : (
    <Stack
      spacing={'2rem'}
      direction={'column'}
      alignItems={'center'}
      sx={{ padding: '1rem' }}
    >
      <Avatar
        sx={{
          width: '10rem',
          height: '10rem',
          objectFit: 'contain',
          border: `5px solid ${primary}`,
          marginBottom: '1rem',
        }}
        src={isHome ? user?.avatar?.url : member?.avatar}
      />
      <ProfileCard
        text={'Bio'}
        Icon={<CameraAlt />}
        index={1}
        heading={isHome ? user?.bio : member?.bio}
      />
      <ProfileCard
        text={'Username'}
        Icon={<EmailIcon />}
        index={2}
        heading={isHome ? user?.username : member?.username}
      />
      <ProfileCard
        text={'Name'}
        Icon={<FaceIcon />}
        index={3}
        heading={isHome ? user?.name : member?.name}
      />
      <ProfileCard
        text={'Joined'}
        Icon={<CalendarIcon />}
        index={4}
        heading={moment(isHome ? user?.createdAt : member?.createdAt).fromNow()}
      />
      {!isHome && (
        <Tooltip title="Delete Chat">
          <IconButton
            onClick={openDeleteChatMenu}
            sx={{
              marginTop: 2,
              bgcolor: primary,
              color: 'white',
              '&:hover': { bgcolor: primaryDark },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      <ConfirmDialog
        description={'Are you sure you want to delete this chat?'}
        open={isDeleteMenu}
        handleClose={() => dispatch(setIsDeleteMenu(false))}
        title={'Delete Chat'}
        deleteHandler={handleDeleteChat}
      />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '-100%' }}
      whileInView={{ opacity: 1, y: '0' }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        color={'black'}
        textAlign={'center'}
      >
        {Icon && Icon}

        <Stack>
          <Typography variant="body1" fontWeight={'bold'} color={primaryDark}>
            {heading}
          </Typography>
          <Typography variant="body2" color="gray">
            {text}
          </Typography>
        </Stack>
      </Stack>
    </motion.div>
  )
}

export default Profile
