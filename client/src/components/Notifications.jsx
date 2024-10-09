import { Clear as ClearIcon, Done as DoneIcon } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../hooks/customHooks'
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from '../redux/query/api'
import { setIsNotification } from '../redux/reducer/misc'

const Notifications = () => {
  const dispatch = useDispatch()

  const { isNotification } = useSelector((state) => state.misc)
  const { data, isLoading, isError, error } = useGetNotificationsQuery('')
  const [acceptFriendRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async ({ _id, accept }) => {
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept })
      console.log(res)
      if (res.data?.success) {
        console.log('use socket')
        toast.success(res.data.message)
      } else {
        toast.error(res?.error.message || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  }

  useErrors([{ isError, error }])

  const handleNotificationClose = () => {
    dispatch(setIsNotification(false))
  }

  return (
    <Dialog open={isNotification} onClose={handleNotificationClose}>
      <Stack p={'2rem'} direction={'column'} width={'max'}>
        <DialogTitle textAlign={'center'}>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : data?.requests.length > 0 ? (
          <List sx={{ gap: '1rem' }}>
            {data?.requests?.map((i) => (
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
  const { name, avatar } = sender

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
