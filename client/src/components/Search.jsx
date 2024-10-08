import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  useLazySearchUserQuery,
  useSendRequestMutation,
} from '../redux/query/api'
import { setIsSearch } from '../redux/reducer/misc'
import UserItem from './UserItem'
import toast from 'react-hot-toast'
import { useAsyncMutation } from '../hooks/customHooks'

const Search = () => {
  const searchQuery = useInputValidation('')
  const dispatch = useDispatch()

  const { isSearch } = useSelector((state) => state.misc)
  const [searchUser] = useLazySearchUserQuery()
  const [sendRequest, isLoadingRequest] = useAsyncMutation(
    useSendRequestMutation
  )

  const [users, setUsers] = React.useState([])

  const addFriendHandler = async (id) => {
    await sendRequest('Sending friend request', { userId: id })
  }

  const closeSearch = () => {
    dispatch(setIsSearch(false))
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchUser(searchQuery.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err))
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [searchQuery.value])

  const isLoadingFriendRequest = false

  return (
    <Dialog open={isSearch} onClose={closeSearch}>
      <Stack p={'2rem'} direction={'column'} width={'25rem'}>
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

      <List sx={{ overflow: 'auto', height: '100%' }}>
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
