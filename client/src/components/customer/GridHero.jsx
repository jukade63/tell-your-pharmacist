import { Grid, Paper, Typography } from '@mui/material'
import image1 from '../../assets/images/counseling.jpg'
import image2 from '../../assets/images/vitamin2.jpg'
import image3 from '../../assets/images/delivery.jpg'
import image4 from '../../assets/images/pharmacy.jpg'

function GridHero() {
  const imageStyle = {
    width: '65px',
    height: '65px',
    borderRadius: '50%',
  }

  const gridItemStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1em',
    width: '80%',
    height: '150px',
    textAlign: 'center',
  }

  return (
    <div style={{ backgroundColor: '#FAFBFD', padding: '15px 0' }}>
      <Grid container spacing={1}>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <img src={image1} alt='feature1' style={imageStyle} />
            <Typography variant='subtitle2' mt={1}>
              ปรึกษาเภสัชกรฟรี
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <img src={image3} alt='feature2' style={imageStyle} />
            <Typography variant='subtitle2' mt={1}>
              รอรับยาที่บ้าน
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <img src={image2} alt='feature3' style={imageStyle} />
            <Typography variant='subtitle2' mt={1}>
              สอบถามเรื่องยา ผลิตภัณฑ์สุขภาพ
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={gridItemStyle}>
          <Paper elevation={2} sx={cardStyle}>
            <img src={image4} alt='feature4' style={imageStyle} />
            <Typography variant='subtitle2' mt={1}>
              1000+ ร้านยาคุณภาพพร้อมให้บริการ
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default GridHero
