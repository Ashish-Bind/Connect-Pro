import { Add as AddIcon, Remove as DeleteIcon } from '@mui/icons-material'
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
  const { username: name, _id, avatar } = user

  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} />

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
          }}
        >
          {name}
        </Typography>

        <IconButton
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
          size="small"
          sx={{
            bgcolor: isAdded ? 'error.main' : 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: isAdded ? 'error.dark' : 'primary.dark',
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
