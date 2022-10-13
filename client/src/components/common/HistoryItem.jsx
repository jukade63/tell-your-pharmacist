import { Grid } from '@mui/material'
import React from 'react'

function HistoryItem() {
  return (
    <div>
      <Grid container direction='row'>
        <Grid item xs={6}>
          ร้านอุ่นใจฟาร์มาซี
        </Grid>
        <Grid item xs={3}>
          18-02-2022
        </Grid>
        <Grid item xs={3}>
          18.45 น.
        </Grid>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={6}>
          ค่าบริการ
        </Grid>
        <Grid item xs={6}>
          155.00 บ.
        </Grid>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={6}>
          โรค/อาการ
        </Grid>
        <Grid item xs={6}>
          กรดไหลย้อน
        </Grid>
      </Grid>
      <Grid container direction='row'>
        <Grid item xs={6}>
          ยาที่ได้
        </Grid>
        <Grid item xs={6}>
          Gaviscon
        </Grid>
      </Grid>
    </div>
  )
}

export default HistoryItem
