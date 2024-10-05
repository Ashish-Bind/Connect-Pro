import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material'
import { Clear as ClearIcon, Done as DoneIcon } from '@mui/icons-material'
import { primary, primaryDark } from '../../constants/color'
import { users as sampleUsers } from '../../constants/data'
import UserItem from '../UserItem'
import { useState } from 'react'

const AddMemberDialog = ({
  open,
  handleClose,
  handleAdd,
  chatId,
  isLoadingAddMember,
  addMember,
}) => {
  const [members, setMembers] = useState(sampleUsers)
  const [selectedMembers, setSelectedMembers] = useState([])

  const selectGroupMember = (id) => {
    setSelectedMembers((prev) => {
      return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack p={'1rem'} width={'30rem'} spacing={'1rem'}>
        <DialogTitle>Add Members</DialogTitle>
        <Stack>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((i) => (
              <UserItem
                key={i._id}
                user={i}
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
            onClick={() => {}}
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
            onClick={handleClose}
            size="large"
            startIcon={<ClearIcon />}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog
