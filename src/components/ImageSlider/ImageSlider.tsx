import React from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type ImageSliderPropsType = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderPropsType> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return !images.length ? null : (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index}>
          <img
            src={image}
            alt="products"
            style={{
              maxWidth: '100%',
              objectFit: 'cover',
              width: '100%',
              maxHeight: '700px',
              display: 'block',
            }}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageSlider;
