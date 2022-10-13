import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ActionButtons() {
  const navigate = useNavigate()
  return (
    <Stack spacing={2}>
      <Link to='/pharmacy/dispense' style={{textDecoration: 'none'}}>
        <Button variant='contained' fullWidth>
          จ่ายยา
        </Button>
      </Link>
      <Link to='/pharmacy/stocks' style={{textDecoration: 'none'}}>
        <Button variant='contained' fullWidth>
          จัดการสต็อกสินค้า
        </Button>
      </Link>
      <Link to='/pharmacy/orders' style={{textDecoration: 'none'}}>
        <Button variant='contained'fullWidth >สถานะออเดอร์</Button>
      </Link>
    </Stack>
  )
}

export default ActionButtons
