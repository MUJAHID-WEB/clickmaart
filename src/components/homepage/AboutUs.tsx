import { useTranslation } from "next-i18next";
import { useState } from "react";
import Image from "next/image";

const AboutUs = () => {
  const { t } = useTranslation("common");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      text: t("home.about.review_text1"),
      name: t("home.about.reviewer1"),
      location: t("home.about.review_address1"),
    },
    {
      id: 2,
      text: t("home.about.review_text2"),
      name: t("home.about.reviewer2"),
      location: t("home.about.review_address2"),
    },
  ];

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* About Content */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <h4 className="text-xl font-bold text-secondary mb-2">
                {t("home.about.subtitle")}
              </h4>
              <h2 className="text-4xl font-bold text-primary uppercase">
                {t("home.about.title")}
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative md:w-2/5">
                <Image
                  src="/images/homepage/aboutus.png"
                  alt="About Us"
                  fill
                  className="object-cover rounded-xl relative "
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-3/5 space-y-6">
                <p className="text-lg text-gray-700">
                  {t("home.about.description")}
                </p>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("home.about.list_title")}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <ul className="space-y-2 list-disc pl-5">
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                    </ul>
                    <ul className="space-y-2 list-disc pl-5">
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                      <li className="text-lg text-gray-700">
                        {t("about.list_item")}
                      </li>
                    </ul>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-indigo-600 from-primary to-secondary text-white rounded-lg font-medium"
                >
                  {t("home.about.learn_more")}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.37124 0.500001L12.3712 0.5C12.9235 0.5 13.3712 0.947715 13.3712 1.5L13.3712 10.5C13.3712 11.0523 12.9235 11.5 12.3712 11.5C11.819 11.5 11.3712 11.0523 11.3712 10.5L11.3712 3.91421L2.07835 13.2071C1.68783 13.5976 1.05466 13.5976 0.664138 13.2071C0.273614 12.8166 0.273614 12.1834 0.664138 11.7929L9.95703 2.5L3.37124 2.5C2.81896 2.5 2.37124 2.05228 2.37124 1.5C2.37124 0.947716 2.81896 0.5 3.37124 0.500001Z"
                      fill="white"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:w-1/3 relative bg-[teal] rounded-xl p-8 mt-12 lg:mt-0">
            <Image
              src="/images/homepage/qoute.png"
              alt="Quote"
              width={150}
              height={130}
              className="absolute top-0 right-0"
              sizes="96px"
            />

            <div className="overflow-hidden relative h-[500px]">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    <div className="flex flex-col items-center text-center space-y-8">
                      <p className="text-lg text-white">{review.text}</p>

                      <div className="space-y-2">
                        <div className="flex justify-center gap-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 53.867 53.867"
                              className="text-yellow-400"
                            >
                              <polygon
                                fill="currentColor"
                                points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182"
                              />
                            </svg>
                          ))}
                        </div>

                        <h4 className="text-xl font-bold text-white">
                          {review.name}
                        </h4>
                        <h5 className="text-lg text-white">
                          {review.location}
                        </h5>
                      </div>

                      <div className="relative h-8 w-[300px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80"
                          height="80"
                          viewBox="0 0 64 64"
                          className="absolute left-1/4 top-0 bg-indigo-600 p-5 rounded-full z-10"
                        >
                          <g id="Quotemarks-left">
                            <path
                              d="M50.6292648,26.225668c-0.1288986-1.3934994-0.0303001-5.1816006,3.5985985-10.4492006   c0.2745018-0.3975,0.2247009-0.9335995-0.1161957-1.2743998c-1.4795036-1.4794998-2.395504-2.4131002-3.0379982-3.0663996   c-0.8448029-0.8614006-1.2305031-1.2539005-1.795002-1.7657003c-0.3769035-0.3388004-0.9472008-0.3446999-1.3281021-0.0125999   c-6.3251991,5.5038996-13.3505974,16.8768997-12.3339958,30.8105011   c0.5956955,8.1815987,6.5634956,14.1200981,14.1894951,14.1200981c7.8260994,0,14.1932983-6.3661995,14.1932983-14.1923981   C63.9993629,32.845768,58.0736694,26.6543674,50.6292648,26.225668z M49.8060646,52.5879669   c-6.5489006,0-11.6767998-5.1581993-12.1953011-12.2645988c0,0,0,0,0-0.0009995   c-1.1435966-15.6709003,8.1718025-25.8496017,10.9863014-28.5449009c0.2743988,0.2705002,0.5878983,0.5887995,1.0498009,1.0594997   c0.5565987,0.5664005,1.3183975,1.3417997,2.4706993,2.4981003c-4.4053001,6.7870998-3.5741997,11.6229992-3.2099991,12.3164005   c0.1728973,0.3290997,0.5273972,0.5508003,0.8984985,0.5508003c6.7236023,0,12.1932983,5.469698,12.1932983,12.1933002   C61.9993629,47.1182671,56.5296669,52.5879669,49.8060646,52.5879669z"
                              fill="#000000"
                            />
                            <path
                              d="M15.1136675,26.225668c-0.1299-1.3896008-0.0341997-5.1748009,3.5985994-10.4492006   c0.2735004-0.3975,0.2245998-0.9335995-0.1161995-1.2743998c-1.4766006-1.4765997-2.3915997-2.4091997-3.0332003-3.0625   c-0.8476-0.8633003-1.2343998-1.2568998-1.7987995-1.7695999c-0.3769999-0.3388004-0.9473-0.3437004-1.3281002-0.0136003   c-6.3251996,5.5039005-13.3515997,16.875-12.3369999,30.8115005v0.0009995   c0.5977,8.1805992,6.5664001,14.1190987,14.1924,14.1190987c7.8261995,0,14.1934004-6.3661995,14.1934004-14.1923981   C28.4847679,32.8448677,22.5589676,26.6524677,15.1136675,26.225668z M14.2913675,52.5879669   c-6.5478001,0-11.6786995-5.1581993-12.1982002-12.2655983v0.0009995   c-1.1406-15.6748009,8.1747999-25.8516006,10.9892006-28.5459003c0.2754002,0.2705002,0.5899,0.5908003,1.0528002,1.0625   c0.5555992,0.5663996,1.3163996,1.3408003,2.4667988,2.4951c-4.4052992,6.7880993-3.5741997,11.6229992-3.2099991,12.3153992   c0.1729002,0.3291016,0.5283003,0.5518017,0.8993998,0.5518017c6.7237005,0,12.1934004,5.469698,12.1934004,12.1933002   C26.4847679,47.1182671,21.0150681,52.5879669,14.2913675,52.5879669z"
                              fill="#000000"
                            />
                          </g>
                        </svg>
                        <div className="absolute right-1/4 top-0 ">
                          <Image
                            src="/images/homepage/shojib.png"
                            alt="Reviewer"
                            width={80}
                            height={80}
                            className="object-cover rounded-full"
                            sizes="90px"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`flex items-center justify-center w-14 h-14 bg-white rounded-full border-2 border-white hover:bg-primary hover:border-primary ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 14L1 8L7 2"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex === reviews.length - 1}
                className={`flex items-center justify-center w-14 h-14 bg-white rounded-full border-2 border-white hover:bg-primary hover:border-primary ${
                  currentIndex === reviews.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 14L8 8L2 2"
                    stroke="#000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
