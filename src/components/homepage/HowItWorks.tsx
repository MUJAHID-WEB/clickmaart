import { useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const HowItWorks = () => {
  const { t } = useTranslation("common");
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      number: "01",
      title: t("how_it_works.tab1.title"),
      image: "/images/homepage/retailer.webp",
      description: t("how_it_works.tab1.description"),
      points: [
        t("how_it_works.tab1.point1"),
        t("how_it_works.tab1.point2"),
        t("how_it_works.tab1.point3"),
      ],
      link: "/about-us",
    },
    {
      id: 1,
      number: "02",
      title: t("how_it_works.tab2.title"),
      image: "/images/homepage/wholesale.jpg",
      description: t("how_it_works.tab2.description"),
      points: [
        t("how_it_works.tab2.point1"),
        t("how_it_works.tab2.point2"),
        t("how_it_works.tab2.point3"),
      ],
      link: "/wholesaler",
    },
    // {
    //   id: 2,
    //   number: "03",
    //   title: t("how_it_works.tab3.title"),
    //   image: "/images/homepage/customer.webp",
    //   description: t("how_it_works.tab3.description"),
    //   points: [
    //     t("how_it_works.tab3.point1"),
    //     t("how_it_works.tab3.point2"),
    //     t("how_it_works.tab3.point3"),
    //   ],
    //   link: "/customer",
    // },
    // {
    //   id: 3,
    //   number: "04",
    //   title: t("how_it_works.tab4.title"),
    //   image: "/images/homepage/delivery.jpeg",
    //   description: t("how_it_works.tab4.description"),
    //   points: [
    //     t("how_it_works.tab4.point1"),
    //     t("how_it_works.tab4.point2"),
    //     t("how_it_works.tab4.point3"),
    //   ],
    //   link: "/delivery",
    // },
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto">
        <div className="text-center mb-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("how_it_works.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("how_it_works.subtitle")}
          </p>
        </div>

        <div className="flex flex-col">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-4 rounded-lg transition-all w-2xs duration-300 ${
                  activeTab === tab.id
                    ? "bg-indigo-700 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
                aria-label={tab.title}
              >
                <span className="text-lg font-semibold">{tab.number}</span>
                <h5 className="text-md font-medium whitespace-nowrap">
                  {tab.title}
                </h5>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`transition-all duration-300 ${
                  activeTab === tab.id
                    ? "block opacity-100"
                    : "hidden opacity-0 absolute"
                }`}
              >
                <div className="flex flex-col items-center lg:flex-row gap-8 lg:gap-12">
                  {/* Image */}
                  <div className="lg:w-1/2 w-full">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={tab.image}
                        alt={tab.title}
                        fill
                        className="object-cover"
                        priority={activeTab === tab.id}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 space-y-4">
                    <p className="text-2xl font-semibold text-indigo-700">
                      {tab.number}
                    </p>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {tab.title}
                    </h3>
                    <p className="text-lg text-gray-600">{tab.description}</p>

                    <div className="space-y-4 mt-6">
                      {tab.points.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <Image
                              src="/images/homepage/tick.jpeg"
                              alt="Checkmark"
                              width={24}
                              height={24}
                            />
                          </div>
                          <p className="text-md text-gray-600">{point}</p>
                        </div>
                      ))}
                    </div>

                    {tab.link && (
                      <div className="mt-8">
                        <Link
                          href={tab.link}
                          className="inline-block px-6 py-3 bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-800 transition-colors"
                        >
                          {t("how_it_works.learn_more")}
                          <span className="ml-2">→</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
