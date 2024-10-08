import { Clear as ClearIcon, Done as DoneIcon } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { notifications as sampleNotifications } from '../constants/data'
import { secondary } from '../constants/color'
import { useGetNotificationsQuery } from '../redux/query/api'

const Notifications = () => {
  const { data } = useGetNotificationsQuery('')

  const friendRequestHandler = ({ _id, accept }) => {}

  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'max'}>
        <DialogTitle textAlign={'center'}>Notifications</DialogTitle>

        {sampleNotifications.length > 0 ? (
          <List sx={{ gap: '1rem' }}>
            {sampleNotifications.map((i) => (
              <NotificationItem
                key={i._id}
                sender={i.sender}
                _id={i._id}
                handler={friendRequestHandler}
              />
            ))}
          </List>
        ) : (
          <p>No Notifications</p>
        )}
      </Stack>
    </Dialog>
  )
}

const NotificationItem = React.memo(function NotificationItemComponent({
  sender,
  _id,
  handler,
}) {
  const { username: name, avatar } = sender

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
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction={'row'} spacing={'1rem'}>
          <Button onClick={() => handler({ _id, accept: false })}>
            <ClearIcon color="error" />
          </Button>
          <Button
            onClick={() => handler({ _id, accept: true })}
            variant="text"
            size="medium"
          >
            <DoneIcon color="success" />
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  )
})

export default Notifications
