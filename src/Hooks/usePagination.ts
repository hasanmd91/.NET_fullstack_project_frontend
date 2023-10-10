import { useState } from 'react';
import { product } from '../types/product';

export const usePagination = (products: product[], limitPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageLimit = Math.ceil(products.length / limitPerPage);

  const calculateCurrentProducts = (): product[] => {
    const indexOfLastProduct = currentPage * limitPerPage;
    const indexOfFirstProduct = indexOfLastProduct - limitPerPage;
    const currentProducts = products.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    return currentProducts;
  };

  const currentProducts = calculateCurrentProducts();

  const setPage = (page: number) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, pageLimit));
  };

  return {
    currentPage,
    pageLimit,
    currentProducts,
    setPage,
  };
};
