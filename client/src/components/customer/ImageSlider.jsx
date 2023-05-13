import image1 from '../../assets/images/counseling.jpg'
import image2 from '../../assets/images/vitamin2.jpg'
import image3 from '../../assets/images/delivery.jpg'
import image4 from '../../assets/images/pharmacy.jpg'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { Typography } from '@mui/material'

const slides = [
  { image: image1, title: 'Pharmacist counseling' },
  { image: image2, title: 'Vitamins & Supplements' },
  { image: image3, title: 'Home delivery' },
  { image: image4, title: '1000+ Qualified pharmacists' },
]

function ImageSlider() {
  const slideContainerStyle = {
    height: '235px',
    margin: '0 auto',
  }

  const slideStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginBottom: '15px',
  }

  return (
    <div
      style={{
        padding: '25px 0',
        backgroundColor: '#FAFBFD',
      }}
    >
      <AliceCarousel
        autoPlay
        autoPlayInterval='2000'
        disableButtonsControls
        animationDuration='2000'
        infinite
      >
        {slides.map((slide, index) => (
          <div style={slideContainerStyle} key={index}>
            <div style={slideStyle}>
              <img src={slide.image} alt='features' style={imageStyle} />
              <Typography variant='h3'>{slide.title}</Typography>
            </div>
          </div>
        ))}
      </AliceCarousel>
    </div>
  )
}

export default ImageSlider
