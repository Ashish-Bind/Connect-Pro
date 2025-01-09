import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { Clear as ClearIcon, Done as DoneIcon } from '@mui/icons-material'
import { primary, primaryDark } from '../../constants/color'
import { users as sampleUsers } from '../../constants/data'
import UserItem from '../UserItem'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducer/misc'
import { useAsyncMutation, useErrors } from '../../hooks/customHooks'
import {
  useAddGroupMemberMutation,
  useGetUserFriendsQuery,
} from '../../redux/query/api'

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch()
  const { isAddMember } = useSelector((state) => state.misc)

  const userFriends = useGetUserFriendsQuery(chatId)
  const [addMember, isAddMemberLoading] = useAsyncMutation(
    useAddGroupMemberMutation
  )

  const [members, setMembers] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])

  const errors = [
    {
      isError: userFriends.isError,
      error: userFriends.error,
    },
  ]

  useErrors(errors)

  const selectGroupMember = (id) => {
    setSelectedMembers((prev) => {
      return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }

  const closeHandler = () => {
    dispatch(setIsAddMember(false))
  }

  const addMemberHandler = () => {
    addMember('Adding Members', {
      chatId,
      members: selectedMembers,
    })
    closeHandler()
  }

  useEffect(() => {
    if (userFriends.data) {
      setMembers(userFriends.data?.friends)
    }
  }, [userFriends.data])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={'1rem'} width={'30rem'} spacing={'1rem'}>
        <DialogTitle>Add Friends</DialogTitle>
        <Stack>
          {userFriends.isLoading ? (
            <Skeleton />
          ) : members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={{ ...i, avatar: i.avatar.url }}
                handler={selectGroupMember}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={'center'}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={'row'}
          alightItems={'center'}
          justifyContent={'space-evenly'}
        >
          <Button
            onClick={addMemberHandler}
            disabled={isAddMemberLoading}
            variant="outlined"
            sx={{
              borderColor: primary,
              color: primary,
              '&:hover': {
                borderColor: primaryDark,
                color: primaryDark,
              },
            }}
            startIcon={<DoneIcon />}
            size="large"
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={closeHandler}
            size="large"
            startIcon={<ClearIcon />}
            disabled={isAddMemberLoading}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
