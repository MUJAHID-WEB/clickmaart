import React from "react";
import { useTranslation } from "next-i18next";

const BecomeMember = () => {
  const { t } = useTranslation("common");

  return (
    <section className="z-2 relative py-8 md:pt-8 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
          {t("become_member.title")}
          </h2>
          <div className="text-lg text-gray-600">
          {t("become_member.subtitle")}
          </div>
        </div>

        <div className="container mx-auto">
          {/* Retailer  Card */}
          <div className="flex flex-col md:flex-row items-center mb-14">
            <div
              className="w-full md:w-3/5 min-h-64 p-16 rounded-[50px] flex justify-end items-center relative overflow-hidden"
              style={{
                background:
                  "url(/images/homepage/retailer.png) no-repeat center center / cover",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[rgba(26,47,37,0.54)] to-[rgba(2,211,113,0)]"></div>
            </div>
            <div className="p-11 w-full md:w-2/5 flex justify-center sm:justify-start">
              <div className="flex flex-col items-center sm:items-start gap-3">
                <h4 className="text-xl">{t("become_member.retailer.label_1")}</h4>
                <h3 className="font-extrabold text-2xl text-[#000] mt-1">
                {t("become_member.retailer.label_2")}
                </h3>
                <button
                  type="button"
                  className="flex items-center justify-center min-w-[120px] px-4 py-2 text-[16px] leading-[25px] font-bold text-white text-center rounded-[10px] bg-gradient-to-r from-[#1f2f28] via-[#456053] to-[#3f4743] shadow-md transition-all duration-300 ease-in-out border-0"
                >
                  {t("become_member.retailer.button")}
                </button>
              </div>
            </div>
          </div>

          {/* Wholesaler Card */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div
              className="w-full md:w-3/5 min-h-64 p-16 rounded-[50px] flex justify-start items-center relative overflow-hidden"
              style={{
                background:
                  "url(/images/homepage/wholesaler.jpg) no-repeat center center / cover",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(26,47,37,0.54)] to-[rgba(2,211,113,0)]"></div>
            </div>
            <div className="p-11 w-full md:w-2/5 flex justify-center items-end sm:justify-end">
              <div className="flex flex-col items-center sm:items-end gap-3">
                <h4 className="text-xl">{t("become_member.wholesaler.label_1")}</h4>
                <h3 className="font-extrabold text-2xl text-[#000] mt-1">
                {t("become_member.wholesaler.label_2")}
                </h3>
                <button
                  type="button"
                  className="flex items-center justify-center min-w-[120px] px-4 py-2 text-[16px] leading-[25px] font-bold text-white text-center rounded-[10px] bg-gradient-to-r from-[#1f2f28] via-[#456053] to-[#3f4743] shadow-md transition-all duration-300 ease-in-out border-0"
                >
                  {t("become_member.wholesaler.button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeMember;
