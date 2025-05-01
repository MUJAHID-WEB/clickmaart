import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { StarIcon } from '@heroicons/react/24/solid';
import { Review } from '@/types';

interface CustomerReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

const CustomerReviews = ({ reviews, averageRating, reviewCount }: CustomerReviewsProps) => {
  const { t } = useTranslation('common');
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    name: ''
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted review:', newReview);
    setNewReview({ rating: 5, comment: '', name: '' });
  };

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">{t('product.reviews')} ({reviewCount})</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Review Summary */}
        <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg">
          <div className="text-center mb-4">
            <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-gray-500">/5</span>
          </div>
          
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-6 w-6 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          
          <p className="text-center text-gray-600 mb-6">
            {t('product.based_on_count_reviews', { count: reviewCount })}
          </p>
          
          <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            {t('product.write_review')}
          </button>
        </div>

        {/* Reviews List */}
        <div className="md:w-2/3 space-y-6">
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                {review.location && (
                  <p className="text-sm text-gray-500 mt-2">{review.location}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">{t('product.no_reviews')}</p>
          )}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4">{t('product.add_review')}</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block mb-1">{t('product.your_rating')}</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({...newReview, rating: star})}
                  className="focus:outline-none"
                >
                  <StarIcon
                    className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block mb-1">{t('product.your_name')}</label>
            <input
              type="text"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block mb-1">{t('product.your_review')}</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full p-2 border rounded"
              rows={4}
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {t('product.submit_review')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomerReviews;