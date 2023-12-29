import { product } from '../../types/product';

const productsData: product[] = [
  {
    id: '1',
    title: 'Air Max',
    description:
      'Step into the future of athletic excellence with the Nike AirStride 2023',
    price: 250,
    quantity: 200,
    categoryId: '1',
    category: { name: 'Men', id: '1' },
    images: [
      { id: '2', imageUrl: 'https://img01.ztat.net/article/spp-media-p1' },
    ],
  },

  {
    id: '2',
    title: 'Performance',
    description:
      'Step into the future of athletic excellence with the Nike AirStride 2023',
    price: 150,
    quantity: 200,
    categoryId: '1',
    category: { name: 'Men', id: '1' },
    images: [
      { id: '2', imageUrl: 'https://img01.ztat.net/article/spp-media-p1' },
    ],
  },

  {
    id: '3',
    title: 'Jordan',
    description:
      'Step into the future of athletic excellence with the Nike AirStride 2023',
    price: 350,
    quantity: 200,
    categoryId: '2',
    category: { name: 'Women', id: '2' },
    images: [
      { id: '2', imageUrl: 'https://img01.ztat.net/article/spp-media-p1' },
    ],
  },
];

export default productsData;
