import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Paper,
  Rating,
} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams, useNavigate, Link } from 'react-router-dom';

import CenteredContainer from '../components/CenterContainer/CenterContainer';
import {
  getAProductsAsync,
  getAllProductsByCategoryAsync,
} from '../redux/thunks/productThunk';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { addItemToCart } from '../redux/reducers/cartReducer';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import { CartItem } from '../types/cart';
import { Image, Review, newReview, product } from '../types/product';
import Button from '../components/Button/Button';
import MediaCard from '../components/Card/Card';
import TextField from '../components/TextField/TextField';
import { createNewReview } from '../utils/reviewUtils';

const ProductView = () => {
  const { product, products } = useAppSelector((state) => state.product);
  const { currentUser } = useAppSelector((state) => state.user);
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAProductsAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!product) return;
    dispatch(getAllProductsByCategoryAsync(product?.categoryId));
  }, [dispatch, product, product?.categoryId]);

  const submitHandler = (event: any) => {
    event.preventDefault();
    if (!currentUser || !product || !rating) return;
    const reviewData: newReview = {
      content: review,
      ratings: rating,
      productId: product.id,
      userId: currentUser.id,
    };

    console.log(reviewData);
    createNewReview(reviewData);

    setTimeout(() => {
      dispatch(getAProductsAsync(product.id));
    }, 1000);
  };

  const addTocart = () => {
    if (product !== undefined && product !== null) {
      const cartItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        totalPrice: product.price,
        quantity: 1,
        image: product.images[0].imageUrl,
      };
      dispatch(addItemToCart(cartItem));
    }
  };

  const imageUrls: string[] = product?.images.map(
    (image: Image) => image.imageUrl
  );

  if (product) {
    return (
      <Container maxWidth="lg">
        <CenteredContainer>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <ImageSlider images={imageUrls} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h2" fontWeight={'bold'}>
                  {product?.title}
                </Typography>
                <Divider />
                <Typography variant="h5" fontWeight={'bold'} marginTop={'2rem'}>
                  Description:
                </Typography>
                <Typography variant="body1" marginBottom={'1rem'}>
                  {product.description}
                </Typography>
                <Typography variant="h5" fontWeight={'bold'} marginTop={'1rem'}>
                  Price:
                </Typography>
                <Typography variant="h6" color={'ActiveBorder'}>
                  ${product.price}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px', marginTop: '2rem' }}>
                <Button type="button" onClick={addTocart}>
                  Add to Cart
                </Button>
                <Button
                  sx={{ background: '#d93226' }}
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  BACK TO PRODUCT
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Reviews
            </Typography>
            <Box
              mt="20px"
              display="flex"
              flexDirection={'column'}
              columnGap="1.33%"
            >
              {product.reviews.map((review: Review) => (
                <Paper
                  sx={{ padding: '10px', marginBottom: '5px' }}
                  key={review.id}
                >
                  <Rating value={review.ratings} readOnly />
                  <Typography> {review.content}</Typography>
                </Paper>
              ))}

              <Paper sx={{ padding: '10px', marginBottom: '5px' }}>
                <form onSubmit={submitHandler}>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <TextField onChange={(e) => setReview(e.target.value)} />
                  <Button>Post Review</Button>
                </form>
              </Paper>
            </Box>
          </Box>

          <Box mt="50px" width="100%">
            <Typography variant="h3" fontWeight="bold">
              Related Products
            </Typography>
            <Box mt="20px" display="flex" flexWrap="wrap" columnGap="1.33%">
              {products.slice(0, 5).map((p: product) => (
                <Link to={`/products/${p.id}`} key={p.id}>
                  <MediaCard product={p} />
                </Link>
              ))}
            </Box>
          </Box>
        </CenteredContainer>
      </Container>
    );
  }
  return null;
};

export default ProductView;
