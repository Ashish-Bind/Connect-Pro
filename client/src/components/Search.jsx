import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'
import { useInputValidation} from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'

const Search = () => {
  const searchQuery = useInputValidation('')
  const users = []

  return (
    <Dialog open>
      <Stack p={'2rem'} direction={'column'} width={'30rem'}>
        <DialogTitle textAlign={'center'}>Find People</DialogTitle>
        <TextField label='' value={searchQuery.value} onChange={searchQuery.changeHandler} variant='outlined' size='small' slotProps={{input:{startAdornment:(<InputAdornment position='start'><SearchIcon/></InputAdornment>)}}}/>
      </Stack>

      <List>
        {users.map((user) => (
          <ListItem key={user}>
            <ListItemText/>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default Search