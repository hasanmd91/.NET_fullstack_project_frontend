import React, { useEffect, useState } from 'react';
import useAppSelector from '../Hooks/useAppSelector';
import useAppDispatch from '../Hooks/useAppDispatch';
import {
  getAllProductsAsync,
  deleteProductAsync,
} from '../redux/methods/productMethod';
import Form from './Form';

const Home = () => {
  const products = useAppSelector((state) => state.product);

  const [edit, setEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProductsAsync());
  }, []);

  const handleDelete = (productId: number) => {
    dispatch(deleteProductAsync(productId));
  };
  const handleEdit = () => {};

  return products ? (
    <div>
      {products.products.map((product) => (
        <div style={{ display: 'flex', gap: '20px' }}>
          {product.title}
          <div>
            <button onClick={() => handleDelete(product.id)}> delete</button>
            <button onClick={handleEdit}>edit </button>
          </div>
        </div>
      ))}
      <Form edit={edit} />
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Home;
