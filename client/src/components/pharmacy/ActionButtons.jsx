import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ActionButtons() {
  const navigate = useNavigate()
  return (
    <Stack spacing={2}>
      <Link to='/pharmacy/dispense' style={{textDecoration: 'none'}}>
        <Button variant='contained' fullWidth sx={{textTransform: 'none'}}>
          Drug dispensing
        </Button>
      </Link>
      <Link to='/pharmacy/stocks' style={{textDecoration: 'none'}} >
        <Button variant='contained' fullWidth sx={{textTransform: 'none'}}>
          Stock management
        </Button>
      </Link>
      <Link to='/pharmacy/orders' style={{textDecoration: 'none'}}>
        <Button variant='contained'fullWidth sx={{textTransform: 'none'}}>Orders</Button>
      </Link>
    </Stack>
  )
}

export default ActionButtons
