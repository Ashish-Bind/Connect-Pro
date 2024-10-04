import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Clear as ClearIcon, Done as DoneIcon } from '@mui/icons-material'
import { users as sampleUsers } from '../constants/data'
import UserItem from './UserItem'
import { useInputValidation } from '6pp'
import React from 'react'

const NewGroup = () => {
  const groupName = useInputValidation('')

  const [members, setMembers] = React.useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = React.useState([])

  const selectGroupMember = (id) => {
    setSelectedMembers((prev) => {
      return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }
  console.log(selectedMembers)

  const submitHandler = () => {
    console.log('submit handler')
  }

  const closeHandler = () => {
    console.log('close handler')
  }

  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'30rem'} spacing={'1rem'}>
        <DialogTitle textAlign={'center'}>New Group Chat</DialogTitle>

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
          {members.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              handler={selectGroupMember}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction={'row'} justifyContent={'space-evenly'}>
          <Button onClick={() => submitHandler()} size="large">
            <DoneIcon color="success" />
          </Button>
          <Button onClick={() => closeHandler()} size="large">
            <ClearIcon color="error" />
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
