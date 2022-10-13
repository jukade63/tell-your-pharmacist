import { Grid, Typography, Stack } from '@mui/material'
import store from '../../assets/images/store3.jpg'
import React from 'react'
import { Image } from '../styles'

function OrderStatus() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <Image src={store} sx={{ width: '40px', height: '40px' }} />
      </Grid>
      <Grid item xs={6}>
        <Stack>
          <Typography color='primary'>อุ่นใจเภสัช</Typography>
          <Typography variant='body2' sx={{ color: 'gray' }}>
            Order no. 0123456789
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={4}>
        <Stack>
          <Typography variant='body2'>18-02-2022 18.25</Typography>
          <Typography variant='body1' sx={{ color: 'green' }}>
            ชำระเงินแล้ว
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default OrderStatus
