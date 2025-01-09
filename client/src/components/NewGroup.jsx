import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  CameraAlt,
  Clear as ClearIcon,
  Done as DoneIcon,
} from '@mui/icons-material'
import { users as sampleUsers } from '../constants/data'
import UserItem from './UserItem'
import { useFileHandler, useInputValidation } from '6pp'
import { useState } from 'react'
import { primary, primaryDark } from '../constants/color'
import { VisuallyHiddenInput } from './styles/StyledComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserFriendsQuery, useNewGroupMutation } from '../redux/query/api'
import { useAsyncMutation, useErrors } from '../hooks/customHooks'
import { setIsNewGroup } from '../redux/reducer/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {
  const dispatch = useDispatch()

  const { isNewGroup } = useSelector((state) => state.misc)

  const friends = useGetUserFriendsQuery()
  const [newGroup, isLoading] = useAsyncMutation(useNewGroupMutation)

  const groupName = useInputValidation('')
  const avatar = useFileHandler('single')

  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [
    {
      isError: friends.isError,
      error: friends.error,
    },
  ]

  useErrors(errors)

  const selectGroupMember = (id) => {
    setSelectedMembers((prev) => {
      return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }
  console.log(selectedMembers)

  const submitHandler = () => {
    if (!groupName.value) return toast.error('Group name is required')

    if (selectedMembers.length < 2)
      return toast.error('Please select at least 2 member')

    const formdata = new FormData()

    formdata.append('name', groupName.value)
    if (avatar.file) {
      formdata.append('groupAvatar', avatar.file)
    }
    formdata.append('members', JSON.stringify(selectedMembers))

    newGroup('Creating new group...', formdata)
    closeHandler()
  }

  const closeHandler = () => {
    dispatch(setIsNewGroup(false))
  }

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack p={'2rem'} direction={'column'} width={'100%'} spacing={'1rem'}>
        <DialogTitle textAlign={'center'}>New Group Chat</DialogTitle>
        <Container width={'100%'}>
          <Stack position={'relative'} width={'10rem'} margin={'1rem auto'}>
            <Avatar
              sx={{
                width: '10rem',
                height: '10rem',
                objectFit: 'contain',
              }}
              src={avatar.preview}
            />

            <IconButton
              sx={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                color: 'white',
                bgcolor: 'rgba(0,0,0,0.5)',
                ':hover': {
                  bgcolor: 'rgba(0,0,0,0.7)',
                },
              }}
              component="label"
            >
              <>
                <CameraAlt />
                <VisuallyHiddenInput
                  type="file"
                  onChange={avatar.changeHandler}
                />
              </>
            </IconButton>
          </Stack>
        </Container>

        <TextField
          label="Group Name"
          variant="outlined"
          size="small"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />

        <Typography textAlign={'center'} variant="body1">
          Members
        </Typography>

        <Stack>
          {friends.isLoading ? (
            <Skeleton />
          ) : (
            friends.data?.friends?.map((user) => (
              <UserItem
                key={user._id}
                user={{ ...user, avatar: user.avatar.url }}
                handler={selectGroupMember}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          spacing={'1rem'}
        >
          <Button
            onClick={() => submitHandler()}
            size="large"
            startIcon={<DoneIcon />}
            variant="outlined"
            sx={{
              borderColor: primary,
              color: primary,
              '&:hover': {
                borderColor: primaryDark,
                color: primaryDark,
              },
            }}
            disabled={isLoading}
          >
            Create Group
          </Button>
          <Button
            onClick={() => closeHandler()}
            size="large"
            startIcon={<ClearIcon />}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
