/* eslint-disable react/display-name */
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Fragment, lazy, memo, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AddMemberDialog from '../components/dialogs/AddMemberDialog'
import { Link } from '../components/styles/StyledComponent'
import UserItem from '../components/UserItem'
import {
  gray,
  primary,
  primaryDark,
  primaryDarkest,
  tertiary,
} from '../constants/color'
import { chats } from '../constants/data'
import { useAsyncMutation, useErrors } from '../hooks/customHooks'
import {
  useDeleteChatMutation,
  useGetChatDetailsQuery,
  useGetGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from '../redux/query/api'
import { setIsAddMember } from '../redux/reducer/misc'
import DummyHeader from '../components/layout/DummyHeader'

const ConfirmDialog = lazy(() => import('../components/dialogs/ConfirmDialog'))

const Group = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAddMember } = useSelector((state) => state.misc)

  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [members, setMembers] = useState([])
  const [updatedGroupName, setUpdatedGroupName] = useState('')

  const groupChatId = useSearchParams()[0].get('group')

  const [renameGroup, isRenameGroupLoading] = useAsyncMutation(
    useRenameGroupMutation
  )
  const [removeMember, isRemoveMemberLoading] = useAsyncMutation(
    useRemoveGroupMemberMutation
  )
  const [deleteChat, isDeleteChatLoading] = useAsyncMutation(
    useDeleteChatMutation
  )

  const userGroups = useGetGroupsQuery('')
  const groupDetails = useGetChatDetailsQuery(
    {
      chatId: groupChatId,
      populate: true,
    },
    { skip: !groupChatId }
  )

  const errors = [
    {
      isError: userGroups.isError,
      error: userGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ]

  useErrors(errors)

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data?.chat?.name)
      setUpdatedGroupName(groupDetails.data?.chat?.name)
      setMembers(groupDetails.data?.chat?.members)
    }

    return () => {
      setGroupName('')
      setUpdatedGroupName('')
      setMembers([])
      setIsEditOpen(false)
    }
  }, [groupDetails.data])

  const handleMobile = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  const handleMobileClose = () => {
    setIsMobileOpen(false)
  }

  const navigateBack = () => {
    navigate('/')
  }

  const updateGroupNameHandler = () => {
    setIsEditOpen(false)
    renameGroup('Updating Group Name...', {
      chatId: groupChatId,
      name: updatedGroupName,
    })
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false)
  }

  const deleteHandler = () => {
    deleteChat('Deleting Group Chat...', groupChatId)
    closeConfirmDeleteHandler()
    navigate('/')
  }

  const removeHandler = (userId) => {
    removeMember('Removing Member...', {
      chatId: groupChatId,
      userId,
    })
  }

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true))
  }

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: 'block',
            sm: 'none',
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            ':hover': {
              bgcolor: 'rgba(0,0,0,0.7)',
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  )

  const GroupName = (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={'1rem'}
      padding={'3rem'}
    >
      {isEditOpen ? (
        <>
          <TextField
            value={updatedGroupName}
            onChange={(e) => setUpdatedGroupName(e.target.value)}
          />
          <IconButton
            onClick={updateGroupNameHandler}
            disabled={isRenameGroupLoading}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h5" color={primaryDark} fontWeight={'bold'}>
            Group Name - {groupName}
          </Typography>
          <IconButton onClick={() => setIsEditOpen(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  )

  const ButtonGroup = (
    <Stack
      direction={{
        xs: 'column-reverse',
        sm: 'row',
      }}
      spacing={'1rem'}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem',
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
        variant="outlined"
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          borderColor: primary,
          color: primary,
          '&:hover': {
            borderColor: primaryDark,
            color: primaryDark,
          },
        }}
        onClick={openAddMemberHandler}
      >
        Add Friends
      </Button>
    </Stack>
  )

  return userGroups.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <DummyHeader />
      <Grid2 container height={'100vh'}>
        <Grid2 sx={{ display: { xs: 'none', sm: 'block' } }} size={{ sm: 3 }}>
          <GroupList myGroups={userGroups?.data?.chats} chatId={groupChatId} />
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 9 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            padding: '1rem 3rem',
            backgroundColor: gray,
          }}
        >
          {IconBtns}
          {groupName && (
            <>
              {GroupName}
              <Typography margin={'2rem'} textAlign={'center'} variant="body1">
                Members
              </Typography>

              <Stack
                maxWidth={'45rem'}
                width={'100%'}
                boxSizing={'border-box'}
                padding={{
                  sm: '1rem',
                  xs: '0',
                  md: '1rem 4rem',
                }}
                spacing={'2rem'}
                height={'50vh'}
                overflow={'auto'}
                marginBottom={'1rem'}
              >
                {isRemoveMemberLoading ? (
                  <CircularProgress />
                ) : (
                  members.map((i) => (
                    <UserItem
                      key={i._id}
                      user={i}
                      isAdded
                      handler={removeHandler}
                      handlerIsLoading={isRemoveMemberLoading}
                    />
                  ))
                )}
              </Stack>

              {ButtonGroup}
            </>
          )}
        </Grid2>

        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog chatId={groupChatId} />
          </Suspense>
        )}

        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
              title={'Delete Group'}
              description={
                'Are you sure you want to delete this group? This action cannot be undone.'
              }
            />
          </Suspense>
        )}

        <Drawer
          open={isMobileOpen}
          onClose={handleMobileClose}
          sx={{ display: { sm: 'none', xs: 'block' } }}
        >
          <GroupList myGroups={chats} w="50vw" chatId={groupChatId} />
        </Drawer>
      </Grid2>
    </Fragment>
  )
}

const GroupList = ({ w = '100%', myGroups = [], chatId }) => {
  return (
    <Stack
      width={w}
      sx={{
        height: '100vh',
        overflow: 'auto',
      }}
      bgcolor={tertiary}
    >
      {myGroups.length > 0 ? (
        myGroups.map((group) => (
          <GroupListItem group={group} chatId={chatId} key={group._id} />
        ))
      ) : (
        <Typography textAlign={'center'} padding="1rem">
          No groups
        </Typography>
      )}
    </Stack>
  )
}

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault()
      }}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Stack
        direction={'row'}
        spacing={'1rem'}
        alignItems={'center'}
        padding={'1rem'}
      >
        <Avatar src={avatar} />
        <Typography
          sx={{
            fontWeight: 'bold',
            color: primaryDarkest,
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  )
})

export default Group
