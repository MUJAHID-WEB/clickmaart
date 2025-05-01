
import { Product, Review } from '@/types';
import { TFunction } from 'i18next';


const bnToEn = (bnNumber: string): string => {
  const bnDigits = '০১২৩৪৫৬৭৮৯';
  const enDigits = '0123456789';
  return bnNumber.replace(/[০-৯]/g, digit => enDigits[bnDigits.indexOf(digit)]);
};

export const getProducts = (t: TFunction): Product[] => {
  return [
    {
      id: '1',
      name: t('home.products.shoes'),
      price: parseFloat(bnToEn(t('home.products.shoes_price'))),
      discount: 15,
      images: ['/images/homepage/Product1.jpg'],
      rating: parseFloat(bnToEn(t('home.products.shoes_rating'))),
      category: 'shoes',
      description: t('home.products.shoes_description'),
      stock: parseInt(bnToEn(t('home.products.shoes_stock'))),
      specifications: [
    { label: t('home.products.material'), value: t('home.products.shoes_material_value') },
    { label: t('home.products.size'), value: t('home.products.shoes_size_value') },
      { label: t('home.products.type'), value: t('home.products.shoes_type_value') }
      ],
      details: t('home.products.shoes_details')
    },
    {
      id: '2',
      name: t('home.products.oil'),
      price: parseFloat(bnToEn(t('home.products.oil_price'))),
      discount: 10,
      images: ['/images/homepage/Product2.jpg'],
      rating: parseFloat(bnToEn(t('home.products.oil_rating'))),
      category: 'oil',
      description: t('home.products.oil_description'),
      stock: parseInt(bnToEn(t('home.products.oil_stock'))),
      specifications: [
        { label: t('home.products.type'), value: t('home.products.oil_type_value') },
        { label: t('home.products.volume'), value: t('home.products.oil_volume_value') },
        { label: t('home.products.origin'), value: t('home.products.oil_origin_value') }
      ],
      details: t('home.products.oil_details')
    },
    {
      id: '3',
      name: t('home.products.bag'),
      price: parseFloat(bnToEn(t('home.products.bag_price'))),
      discount: 20,
      images: ['/images/homepage/Product3.jpg'],
      rating: parseFloat(bnToEn(t('home.products.bag_rating'))),
      category: 'bags',
      description: t('home.products.bag_description'),
      stock: parseInt(bnToEn(t('home.products.bag_stock'))),
      specifications: [
        { label: t('home.products.material'), value: t('home.products.bag_material_value') },
        { label: t('home.products.dimensions'), value: t('home.products.bag_dimensions_value') },
        { label: t('home.products.capacity'), value: t('home.products.bag_capacity_value') }
      ],
      details: t('home.products.bag_details')
    },
    {
      id: '4',
      name: t('home.products.running_shoes'),
      price: parseFloat(bnToEn(t('home.products.running_shoes_price'))),
      discount: 10,
      images: ['/images/homepage/Product1.jpg'],
      rating: parseFloat(bnToEn(t('home.products.running_shoes_rating'))),
      category: 'shoes',
      description: t('home.products.running_shoes_description'),
      stock: parseInt(bnToEn(t('home.products.running_shoes_stock'))),
      specifications: [
    { label: t('home.products.material'), value: t('home.products.shoes_material_value') },
    { label: t('home.products.size'), value: t('home.products.shoes_size_value') },
      { label: t('home.products.type'), value: t('home.products.shoes_type_value') }
      ],
      details: t('home.products.running_shoes_details')
    },
    {
      id: '5',
      name: t('home.products.casual_shoes'),
      price: parseFloat(bnToEn(t('home.products.casual_shoes_price'))),
      discount: 0,
      images: ['/images/homepage/Product1.jpg'],
      rating: parseFloat(bnToEn(t('home.products.casual_shoes_rating'))),
      category: 'shoes',
      description: t('home.products.casual_shoes_description'),
      stock: parseInt(bnToEn(t('home.products.casual_shoes_stock'))),
      specifications: [
  { label: t('home.products.material'), value: t('home.products.shoes_material_value') },
  { label: t('home.products.size'), value: t('home.products.shoes_size_value') },
    { label: t('home.products.type'), value: t('home.products.shoes_type_value') }
      ],
      details: t('home.products.casual_shoes_details')
    },
    {
      id: '6',
      name: t('home.products.coconut_oil'),
      price: parseFloat(bnToEn(t('home.products.coconut_oil_price'))),
      discount: 5,
      images: ['/images/homepage/Product2.jpg'],
      rating: parseFloat(bnToEn(t('home.products.coconut_oil_rating'))),
      category: 'oil',
      description: t('home.products.coconut_oil_description'),
      stock: parseInt(bnToEn(t('home.products.coconut_oil_stock'))),
      specifications: [
        { label: t('home.products.type'), value: t('home.products.oil_type_value') },
        { label: t('home.products.volume'), value: t('home.products.oil_volume_value') },
        { label: t('home.products.origin'), value: t('home.products.oil_origin_value') }
      ],
      details: t('home.products.coconut_oil_details')
    },
    {
      id: '7',
      name: t('home.products.olive_oil'),
      price: parseFloat(bnToEn(t('home.products.olive_oil_price'))),
      discount: 15,
      images: ['/images/homepage/Product2.jpg'],
      rating: parseFloat(bnToEn(t('home.products.olive_oil_rating'))),
      category: 'oil',
      description: t('home.products.olive_oil_description'),
      stock: parseInt(bnToEn(t('home.products.olive_oil_stock'))),
      specifications: [
        { label: t('home.products.type'), value: t('home.products.oil_type_value') },
        { label: t('home.products.volume'), value: t('home.products.oil_volume_value') },
        { label: t('home.products.origin'), value: t('home.products.oil_origin_value') }
      ],
      details: t('home.products.olive_oil_details')
    },
    {
      id: '8',
      name: t('home.products.backpack'),
      price: parseFloat(bnToEn(t('home.products.backpack_price'))),
      discount: 10,
      images: ['/images/homepage/Product3.jpg'],
      rating: parseFloat(bnToEn(t('home.products.backpack_rating'))),
      category: 'bags',
      description: t('home.products.backpack_description'),
      stock: parseInt(bnToEn(t('home.products.backpack_stock'))),
      specifications: [
        { label: t('home.products.material'), value: t('home.products.bag_material_value') },
        { label: t('home.products.dimensions'), value: t('home.products.bag_dimensions_value') },
        { label: t('home.products.capacity'), value: t('home.products.bag_capacity_value') }
      ],
      details: t('home.products.backpack_details')
    },
    {
      id: '9',
      name: t('home.products.laptop_bag'),
      price: parseFloat(bnToEn(t('home.products.laptop_bag_price'))),
      discount: 0,
      images: ['/images/homepage/Product3.jpg'],
      rating: parseFloat(bnToEn(t('home.products.laptop_bag_rating'))),
      category: 'bags',
      description: t('home.products.laptop_bag_description'),
      stock: parseInt(bnToEn(t('home.products.laptop_bag_stock'))),
      specifications: [
       { label: t('home.products.material'), value: t('home.products.bag_material_value') },
        { label: t('home.products.dimensions'), value: t('home.products.bag_dimensions_value') },
        { label: t('home.products.capacity'), value: t('home.products.bag_capacity_value') }
      ],
      details: t('home.products.laptop_bag_details')
    }
  ];
};

export const getReviews = (): Record<string, Review[]> => {
  return {
    '1': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '2': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '3': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '4': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '5': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '6': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '7': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '8': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
    '9': [
      {
        id: '1',
        userName: 'John Doe',
        rating: 5,
        date: '2023-05-15',
        comment: 'Excellent shoes! Very comfortable and stylish.',
        location: 'New York, USA'
      },
      {
        id: '2',
        userName: 'Sarah Smith',
        rating: 4,
        date: '2023-04-28',
        comment: 'Great quality but runs a bit large.',
        location: 'London, UK'
      }
    ],
  };
};