import { useState } from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 relative border rounded overflow-hidden ${selectedImage === index ? 'border-indigo-500' : 'border-gray-200'}`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div 
        className="relative aspect-square flex-1 order-1 md:order-2 bg-gray-100 rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
      >
        <Image
          src={images[selectedImage]}
          alt="Main product image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom Indicator */}
        {showZoom && (
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute w-32 h-32 bg-white bg-opacity-30 border border-white rounded-full"
              style={{
                left: `${zoomPosition.x}%`,
                top: `${zoomPosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
            <MagnifyingGlassIcon className="absolute w-6 h-6 text-white top-2 right-2" />
          </div>
        )}

        {/* Zoom Preview */}
        {showZoom && (
          <div className="hidden lg:block absolute left-full top-0 ml-4 w-96 h-96 bg-white border rounded-lg overflow-hidden z-10">
            <div 
              className="w-full h-full bg-no-repeat"
              style={{
                backgroundImage: `url(${images[selectedImage]})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: '200%'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;