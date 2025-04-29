// import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { StarIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

const ProductCard = ({ product, showCategory = true }: ProductCardProps) => {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
         {product.specifications && product.specifications.length > 0 && (
        <div className="mt-2 text-sm">
          {product.specifications.slice(0, 2).map((spec, i) => (
            <div key={i}>
              <span className="text-gray-500">{spec.label}:</span> {spec.value}
            </div>
          ))}
        </div>
      )}
      </div>

      <div className="p-4">
        {showCategory && (
          <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        )}
        <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        <div className="flex items-center gap-2">
          {product.discount > 0 ? (
            <>
              <span className="font-bold text-lg">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;