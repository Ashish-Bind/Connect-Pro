/* eslint-disable react/display-name */
import {
  Avatar,
  Box,
  Drawer,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import { memo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { chats } from '../constants/data'

const Group = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const groupChat = useSearchParams()[0].get('group')
  const navigate = useNavigate()

  const handleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleMobileClose = () => {
    setIsMobileOpen(false)
  }

  const navigateBack = () => {
    navigate('/')
  }

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )

  return (
    <Grid2 container height={'100vh'}>
      <Grid2 sx={{ display: { xs: 'none', sm: 'block' } }} size={{ sm: 4 }}>
        <GroupList myGroups={chats} />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 8 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem',
        }}
      >
        {IconBtns}
      </Grid2>

      <Drawer
        open={isMobileOpen}
        onClose={handleMobileClose}
        sx={{ display: { sm: 'none', xs: 'block' } }}
      >
        <GroupList myGroups={chats} />
      </Drawer>
    </Grid2>
  )
}

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={'center'} padding="1rem">
          No groups
        </Typography>
      )}
    </Stack>
  )
}

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault()
      }}
    >
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <Avatar src={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
})

export default Group
