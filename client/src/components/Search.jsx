import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material'
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from './UserItem'
import React from 'react'
import { users as sampleUsers } from '../constants/data'

const Search = () => {
  const searchQuery = useInputValidation('')
  const [users, setUsers] = React.useState(sampleUsers)

  const addFriendHandler = (id) => {
    console.log('add friend', id)
  }

  const isLoadingFriendRequest = false

  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'30rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField
          label=""
          value={searchQuery.value}
          onChange={searchQuery.changeHandler}
          variant="outlined"
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>

      <List>
        {users.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            handler={addFriendHandler}
            handlerIsLoading={isLoadingFriendRequest}
          />
        ))}
      </List>
    </Dialog>
  )
}

export default Search
