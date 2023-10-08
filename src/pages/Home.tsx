import React, { useEffect } from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import useAppDispatch from '../Hooks/useAppDispatch';
import {
  getAllProductsAsync,
  deleteProductAsync,
} from '../redux/methods/productMethod';
import Form from './Form';
import { sortProduct } from '../redux/reducers/productReducer';
import useButtonWithDelay from '../Hooks/useButtonWithDelay';

const Home = () => {
  const products = useAppSelector((state) => state.product);

  const [isDisabled, disabledButtonForASecond] = useButtonWithDelay();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const handleDelete = (productId: number) => {
    dispatch(deleteProductAsync(productId));
    disabledButtonForASecond();
  };

  const sort = () => {
    dispatch(sortProduct('Z-A'));
  };

  return products ? (
    <div>
      <button onClick={sort}>sort</button>
      {products.products.map((product) => (
        <div key={product.id} style={{ display: 'flex', gap: '20px' }}>
          {product.title}
          <div>
            <button
              onClick={() => handleDelete(product.id)}
              disabled={isDisabled}
            >
              delete
            </button>
            <button>edit </button>
          </div>
        </div>
      ))}
      <Form />
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Home;
