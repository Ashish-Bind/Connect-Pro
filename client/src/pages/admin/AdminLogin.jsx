import { useStrongPassword } from '6pp'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { secondary } from '../../constants/color'

const AdminLogin = () => {
  const password = useStrongPassword()

  const submitHandler = () => {}

  return (
    <div style={{ backgroundColor: secondary, overflow: 'auto' }}>
      <Container
        component={'main'}
        maxWidth="sm"
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form style={{ width: '100%' }} onSubmit={submitHandler}>
            <TextField
              required
              label="Admin Key"
              type="password"
              fullWidth
              margin="normal"
              varaint="outlined"
              value={password.value}
              onChange={password.changeHandler}
            />

            {password.error && (
              <Typography color="error" variant="caption">
                {password.error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              margin="normal"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  )
}

export default AdminLogin
