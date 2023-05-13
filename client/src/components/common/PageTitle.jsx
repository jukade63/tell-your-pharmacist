import { Grid, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import React from 'react'
import { Link } from 'react-router-dom'

function PageTitle({ title, toPage }) {
  return (
    
      <Grid container my={1}>
        <Grid item xs={0.5}>
          <Link to={toPage}>
            <ArrowBackIosIcon fontSize='small' />
          </Link>
        </Grid>
        <Grid item xs={11}>
          <Typography variant='h4'>{title}</Typography>
        </Grid>
      </Grid>
    
  )
}

export default PageTitle
