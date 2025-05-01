'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Update container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setZoomPosition({
      x: Math.max(0, Math.min(x, rect.width)),
      y: Math.max(0, Math.min(y, rect.height)),
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 relative">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 relative border rounded overflow-hidden transition-colors ${
              selectedImage === index ? 'border-indigo-500' : 'border-gray-200'
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Main Image Container */}
      <div
        ref={containerRef}
        className="relative aspect-square flex-1 order-1 md:order-2 bg-gray-100 rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={images[selectedImage]}
          alt="Main product image"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoom Lens */}
        {isHovering && (
          <div
            className="absolute pointer-events-none border-2 border-white rounded-full mix-blend-difference"
            style={{
              width: '150px',
              height: '150px',
              left: `${zoomPosition.x}px`,
              top: `${zoomPosition.y}px`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              zIndex: 10,
            }}
          />
        )}

        {/* Zoom Preview */}
        {isHovering && containerSize.width > 0 && (
          <div
            className="hidden lg:block absolute left-full top-0 ml-4 w-96 h-96 bg-white border rounded-lg overflow-hidden z-20 shadow-lg"
            style={{
              backgroundImage: `url(${images[selectedImage]})`,
              backgroundPosition: `-${zoomPosition.x * 2 - 192}px -${zoomPosition.y * 2 - 192}px`,
              backgroundSize: `${containerSize.width * 2}px ${containerSize.height * 2}px`,
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
