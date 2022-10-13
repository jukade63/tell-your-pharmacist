import { Avatar, Stack, Typography } from '@mui/material'
import user from '../../assets/images/customer1.jpg'

function Notifications() {
  return (
    <div>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Avatar src={user} />
        <Typography variant='body2'>ณรงค์ ว่องไว</Typography>
      </Stack>
    </div>
  )
}

export default Notifications
