import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";

const CategoryGrid = () => {
  const { t } = useTranslation("common");

  const categories = [
    {
      id: "electronics",
      name: t("categories.electronics"),
      image: "/",
      count: 125,
    },
    {
      id: "clothing",
      name: t("categories.clothing"),
      image: "/",
      count: 89,
    },
    {
      id: "home",
      name: t("categories.home"),
      image: "/",
      count: 64,
    },
    {
      id: "books",
      name: t("categories.books"),
      image: "/",
      count: 42,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold">{t("categories.title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-12">
        {categories.map((category) => (
          <Link
            href={`/products/${category.id}`}
            key={category.id}
            className="group relative block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-4">
                <div>
                  <h3 className="text-white text-xl font-bold">
                    {category.name}
                  </h3>
                  <p className="text-white/90">
                    {category.count} {t("categories.available")}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryGrid;
