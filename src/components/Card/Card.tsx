import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

type MediaCardPropsType = {
  product: any;
};

const MediaCard: React.FC<MediaCardPropsType> = ({ product }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      sx={{
        width: { md: '200px', xs: '140px' },
        margin: '0.5rem',
        position: 'relative',
        display: 'inline-block',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardMedia
        component={'img'}
        image={
          imageError
            ? 'https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU='
            : product.images[0]?.imageUrl
        }
        alt="image"
        sx={{
          objectFit: 'cover',
          width: '100%',
          maxHeight: { md: '200px', xs: '180px' },
        }}
        onError={handleImageError}
      />
      <CardContent>
        <Typography fontWeight={'bold'} noWrap={true}>
          {product?.title}
        </Typography>
        <Typography variant="caption">{product.category?.name}</Typography>
        <Typography fontWeight={'bold'}>€ {product?.price}</Typography>
      </CardContent>
      <CardActions sx={{ top: 0, right: 0, position: 'absolute' }}>
        <Button size="small">
          <FavoriteBorderIcon sx={{ color: 'whitesmoke' }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
