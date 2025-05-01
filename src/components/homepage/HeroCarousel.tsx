import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const HeroCarousel = () => {
  const { t } = useTranslation('common');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

  const slides = [
    {
      id: 1,
      image: '/images/homepage/shopping_hero1.webp',
      title: t('home.hero.title1'),
      subtitle: t('home.hero.subtitle1'),
      ctaText: t('home.shop_now'),
      link: '/products'
    },
    {
      id: 2,
      image: '/images/homepage/wholesaler_hero3.avif',
      title: t('home.hero.title2'),
      subtitle: t('home.hero.subtitle2'),
      ctaText: t('home.register_now'),
      link: '/wholesaler-registration'
    },
    {
      id: 3,
      image: '/images/homepage/retailer_hero.jpg',
      title: t('home.hero.title3'),
      subtitle: t('home.hero.subtitle3'),
      ctaText: t('home.register_now'),
      link: '/retailer-registration'
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slides[currentSlide].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 100, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          className="absolute inset-0 bg-gray-100"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentSlide === 0} // 
          />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.70)] flex items-center">
            <div className="container mx-auto px-4 text-white">
              <motion.h1 
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold mb-2"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl mb-6 max-w-lg"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              <motion.a
                href={slides[currentSlide].link}
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {slides[currentSlide].ctaText}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;