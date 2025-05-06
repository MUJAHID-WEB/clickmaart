import { useTranslation } from "next-i18next";
import Link from "next/link";
import Image from "next/image";

const CategoryGrid = () => {
  const { t } = useTranslation("common");

  const categories = [
    {
      id: "natural_food",
      name: t("categories.natural_food"),
      image: "/images/category/category.png",
      count: 125,
    },
    {
      id: "organic_food",
      name: t("categories.organic_food"),
      image: "/images/category/category.png",
      count: 89,
    },
    {
      id: "homemade_food",
      name: t("categories.homemade_food"),
      image: "/images/category/category.png",
      count: 64,
    },
    {
      id: "baby_natural_food",
      name: t("categories.baby_natural_food"),
      image: "/images/category/category.png",
      count: 42,
    },
    {
      id: "baby_care",
      name: t("categories.baby_care"),
      image: "/images/category/category.png",
      count: 50,
    },
    {
      id: "toys_kids",
      name: t("categories.toys_kids"),
      image: "/images/category/category.png",
      count: 72,
    },
    {
      id: "herbal_ayurvedic",
      name: t("categories.herbal_ayurvedic"),
      image: "/images/category/category.png",
      count: 39,
    },
    {
      id: "clothing_fashion",
      name: t("categories.clothing_fashion"),
      image: "/images/category/category.png",
      count: 91,
    },
    {
      id: "beauty_personal",
      name: t("categories.beauty_personal"),
      image: "/images/category/category.png",
      count: 84,
    },
    {
      id: "gift_items",
      name: t("categories.gift_items"),
      image: "/images/category/category.png",
      count: 67,
    },
    {
      id: "leather_items",
      name: t("categories.leather_items"),
      image: "/images/category/category.png",
      count: 45,
    },
    {
      id: "electric_items",
      name: t("categories.electric_items"),
      image: "/images/category/category.png",
      count: 103,
    },
    {
      id: "summer_collection",
      name: t("categories.summer_collection"),
      image: "/images/category/category.png",
      count: 58,
    },
    {
      id: "home_decor",
      name: t("categories.home_decor"),
      image: "/images/category/category.png",
      count: 73,
    },
    {
      id: "package_food",
      name: t("categories.package_food"),
      image: "/images/category/category.png",
      count: 66,
    },
    {
      id: "global_mart",
      name: t("categories.global_mart"),
      image: "/images/category/category.png",
      count: 92,
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold mt-12">{t("categories.title")}</h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mt-6 mb-12">
        {categories.map((category) => (
          <Link
            href={`/products/${category.id}`}
            key={category.id}
            className="group relative block overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={112}
                  height={112}
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <h3 className="text-[#1F2937] text-sm sm:text-lg font-medium sm:font-semibold">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoryGrid;
