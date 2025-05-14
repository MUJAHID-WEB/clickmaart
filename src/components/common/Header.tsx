import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon as SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import CategoryGrid from "../homepage/CategoryGrid";

const Header = () => {
  const { t } = useTranslation("common");
  const { language, changeLanguage } = useLanguage();
  const { cartCount, cartItems } = useCart();
  console.log("Header cart count:", cartCount, "Items:", cartItems);

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showJoinDropdown, setShowJoinDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const joinDropdownRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangDropdown(false);
      }
      if (
        joinDropdownRef.current &&
        !joinDropdownRef.current.contains(event.target as Node)
      ) {
        setShowJoinDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className=" bg-[#F3F4F6] text-black sticky">
        {/* Top Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left Side - Logo and Menu */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-white">
                <Image
                  src="/images/homepage/logo.png"
                  alt="Google Play"
                  width={50}
                  height={50}
                  className=""
                />
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                {/* <Link
                  href="/"
                  className="hover:text-indigo-600 font-medium"
                >
                  {t("header.home")}
                </Link>
                <Link
                  href="/about"
                  className="hover:text-indigo-600 font-medium"
                >
                  {t("header.about")}
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-indigo-600 font-medium"
                >
                  {t("header.contact")}
                </Link> */}
                <Link
                  href="/products"
                  className="hover:text-gray-200 font-medium"
                >
                  {t("header.product")}
                </Link>
                {/* <Link
                href="/store"
                className="hover:text-indigo-600 font-medium"
              >
                {t("header.store")}
              </Link> */}
              </nav>
            </div>

            {/* Search */}
            <div className="relative w-2/4 mx-5">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("header.search_placeholder")}
                  className="w-full bg-white rounded-2xl py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Right Side - Search, Cart, Sign In */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-1 hover:text-gray-200"
                onClick={(e) => {
                  if (cartCount === 0) {
                    e.preventDefault();
                  }
                }}
              >
                <ShoppingCartIcon className="h-6 w-6" />

                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>

              {/* Sign In */}
              <Link
                href="/auth/signin"
                className="flex items-center space-x-1 md:bg-indigo-600 md:hover:bg-indigo-700 text-black md:text-white px-4 py-2 rounded-md transition-colors"
              >
                <UserIcon className="h-5 w-5" />
                <span className="hidden md:block">{t("header.sign_in")}</span>
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-1 hover:text-indigo-600 focus:outline-none"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  // Close (X) icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <circle cx="12" cy="5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="19" r="1.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Header */}
        <div className="bg-white text-black ">
          <div className="container mx-auto px-4 flex justify-between items-center space-x-8 ">
            <div className="bg-white p-3 relative flex gap-3 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <h2
                className="text-xl font-bold cursor-pointer flex justify-between items-center"
                onClick={toggleDropdown}
              >
                {t("categories.title")}
                <span className="ml-2">
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </h2>

              <div
                className={`absolute left-0 mt-10 lg:w-[200px] xl:w-[230px] 2xl:w-[280px]  h-[382px] rounded-b-lg p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-100 bg-white transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "opacity-100 max-h-[500px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <CategoryGrid />
              </div>
            </div>

            {/* Language Switcher */}
            <div className="px-4 flex justify-end items-center space-x-8">
              <div className="hidden md:block relative" ref={langDropdownRef}>
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center text-sm hover:text-indigo-600"
                >
                  {language === "en" ? "English" : "বাংলা"}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>

                {showLangDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                    <button
                      onClick={() => {
                        changeLanguage("en");
                        setShowLangDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "en"
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        changeLanguage("bn");
                        setShowLangDropdown(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "bn"
                          ? "bg-indigo-100 text-indigo-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      বাংলা
                    </button>
                  </div>
                )}
              </div>

              <div className="md:hidden relative">
                <button
                  onClick={() =>
                    changeLanguage(language === "en" ? "bn" : "en")
                  }
                  className="flex items-center text-sm hover:text-indigo-600"
                >
                  {language === "en" ? "English" : "বাংলা"}
                </button>
              </div>

              {/* Join Us Dropdown */}
              <div className="relative" ref={joinDropdownRef}>
                <button
                  onClick={() => setShowJoinDropdown(!showJoinDropdown)}
                  className="flex items-center text-sm hover:text-indigo-600"
                >
                  {t("header.join_us")}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>

                {showJoinDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      href="/register/retailer"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setShowJoinDropdown(false)}
                    >
                      {t("header.become_retailer")}
                    </Link>
                    <Link
                      href="/register/wholesaler"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setShowJoinDropdown(false)}
                    >
                      {t("header.become_wholesaler")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (shown when hamburger is clicked) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            {/* <Link
                href="/"
                className="hover:text-indigo-600 font-medium py-2 border-b"
              >
                {t("header.home")}
              </Link> */}
            <Link
              href="/about"
              className="hover:text-indigo-600 font-medium py-2 border-b"
            >
              {t("header.about")}
            </Link>
            <Link
              href="/contact"
              className="hover:text-indigo-600 font-medium py-2 border-b"
            >
              {t("header.contact")}
            </Link>
            <Link
              href="/products"
              className="hover:text-indigo-600 font-medium py-2 border-b"
            >
              {t("header.product")}
            </Link>

            <Link
              href="/register/retailer"
              className="hover:text-indigo-600 font-medium py-2 border-b"
            >
              {t("header.become_retailer")}
            </Link>
            <Link
              href="/register/wholesaler"
              className="hover:text-indigo-600 font-medium py-2"
            >
              {t("header.become_wholesaler")}
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navigation - Mobile/Tablet */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="flex justify-around items-center py-3 px-4">
          {/* Home */}
          <Link href="/" className="flex flex-col items-center text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="text-xs mt-1">{t("header.home")}</span>
          </Link>

          {/* Categories */}
          <Link
            href="/products"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
            <span className="text-xs mt-1">{t("header.product")}</span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600 relative"
            onClick={(e) => {
              if (cartCount === 0) {
                e.preventDefault();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="text-xs mt-1">{t("header.cart")}</span>
            {/* Cart count badge */}
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* Account */}
          <Link
            href="/auth/signin"
            className="flex flex-col items-center text-gray-600 hover:text-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <span className="text-xs mt-1">{t("header.sign_in")}</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
