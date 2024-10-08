import { Add as AddIcon, Remove as DeleteIcon } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import { primary, primaryDark } from '../constants/color'
import React from 'react'

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
  const { username, name, _id, avatar } = user

  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        {avatar ? <Avatar src={avatar} /> : <Avatar />}
        <Stack direction={'column'} width={'100%'}>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 1,
              width: '100%',
              flexDirection: 'column',
              fontWeight: 'bold',
            }}
            color={primary}
          >
            {name}
          </Typography>
          <Typography variant="caption">@{username}</Typography>
        </Stack>

        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded ? 'error.main' : primary,
            color: 'white',
            '&:hover': {
              bgcolor: isAdded ? 'error.dark' : primaryDark,
            },
          }}
        >
          {isAdded ? <DeleteIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  )
}

export default React.memo(UserItem)
