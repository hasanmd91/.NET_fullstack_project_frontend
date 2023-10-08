import React, { useState } from 'react';
import useAppDispatch from '../Hooks/useAppDispatch';
import { createNewProductAsync } from '../redux/methods/productMethod';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    categoryId: '',
    images: [],
  });

  const dispatch = useAppDispatch();

  const changeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValue;
    if (e.target.name === 'price' || e.target.name === 'categoryId') {
      updatedValue = +e.target.value;
    } else if (e.target.name === 'images') {
      updatedValue = e.target.value.split(',');
    } else {
      updatedValue = e.target.value;
    }
    setFormData({ ...formData, [e.target.name]: updatedValue });
  };

  const submithandeler = (e: React.FormEvent) => {
    e.preventDefault();

    const formatedFormdata = {
      ...formData,
      price: parseFloat(formData.price),
      categoryId: parseFloat(formData.categoryId),
    };
    console.log(formatedFormdata);
    dispatch(createNewProductAsync(formatedFormdata));
  };

  return (
    <div style={{ margin: '20px' }}>
      <form onSubmit={submithandeler}>
        <input
          placeholder="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={changeHandeler}
        />
        <br />
        <input
          placeholder="price"
          type="text"
          name="price"
          value={formData.price}
          onChange={changeHandeler}
        />
        <br />
        <input
          placeholder="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={changeHandeler}
        />
        <br />
        <input
          placeholder="categoryId"
          type="text"
          name="categoryId"
          value={formData.categoryId}
          onChange={changeHandeler}
        />
        <br />
        <input
          placeholder="images"
          type="text"
          name="images"
          value={formData.images}
          onChange={changeHandeler}
        />
        <br />
        <button style={{ padding: '5px', margin: '2px 0px' }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
