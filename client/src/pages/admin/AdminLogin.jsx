import { useStrongPassword } from '6pp'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import { primary, primaryDark, secondary } from '../../constants/color'
import { useAsyncMutation } from '../../hooks/customHooks'
import { useAdminLoginMutation } from '../../redux/query/api'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { adminExists, adminNotExists } from '../../redux/reducer/auth'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SERVER } from '../../constants/config'

const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const password = useStrongPassword()
  const { isAdmin, isLoading } = useSelector((state) => state.auth)

  const [adminLogin, isAdminLoginLoading] = useAsyncMutation(
    useAdminLoginMutation
  )

  useEffect(() => {
    if (!isLoading) {
      axios
        .get(`${SERVER}/api/v1/admin`, { withCredentials: true })
        .then(({ data }) => {
          dispatch(adminExists())
        })
        .catch((err) => {
          dispatch(adminNotExists())
        })
    }
  }, [isAdmin, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />
  }
  // thisisournewadmin
  const submitHandler = (e) => {
    e.preventDefault()
    adminLogin('Admin logging in...', password.value).then(() => {
      navigate('/admin/dashboard')
    })
  }

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
              sx={{
                marginTop: 2,
                bgcolor: primary,
                '&:hover': { bgcolor: primaryDark },
              }}
              disabled={isAdminLoginLoading}
              type="submit"
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
