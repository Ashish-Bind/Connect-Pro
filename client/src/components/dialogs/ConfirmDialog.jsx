import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { primary, primaryDark } from '../../constants/color'

const ConfirmDialog = ({
  open,
  handleClose,
  deleteHandler,
  title,
  description,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteHandler} variant="outlined" color="error">
          Delete
        </Button>
        <Button
          variant="outlined"
          sx={{
            borderColor: primary,
            color: primary,
            '&:hover': {
              borderColor: primaryDark,
              color: primaryDark,
            },
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
