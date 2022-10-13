import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import OrderStatus from '../../components/common/OrderStatus'

function OrderTracking() {
  return (
    <Box>
      <Stack direction='row' my={3}>
        <ArrowBackIos />
        <Typography variant='h3'>สถานะออเดอร์</Typography>
      </Stack>
      <OrderStatus />
    </Box>
  )
}

export default OrderTracking
