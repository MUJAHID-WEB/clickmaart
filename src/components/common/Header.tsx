import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCart } from "../../contexts/CartContext";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon as SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Header = () => {
  const { t } = useTranslation("common");
  const { language, changeLanguage } = useLanguage();
  // const { cartCount } = useCart();
  const { cartCount, cartItems } = useCart();
  console.log('Header cart count:', cartCount, 'Items:', cartItems);

  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showJoinDropdown, setShowJoinDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const joinDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
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

  // Focus search input when shown
  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    setShowSearch(false);
    setSearchQuery("");
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Header */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-8">
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
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

      {/* Bottom Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Left Side - Logo and Menu */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Click Maart
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-indigo-600 font-medium">
                {t("header.home")}
              </Link>
              <Link href="/about" className="hover:text-indigo-600 font-medium">
                {t("header.about")}
              </Link>
              <Link
                href="/contact"
                className="hover:text-indigo-600 font-medium"
              >
                {t("header.contact")}
              </Link>
              <Link
                href="/stores"
                className="hover:text-indigo-600 font-medium"
              >
                {t("header.stores")}
              </Link>
            </nav>
          </div>

          {/* Right Side - Search, Cart, Sign In */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              {showSearch ? (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-0 bg-white p-1 shadow-md rounded"
                >
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t("header.search_placeholder")}
                    className="border rounded px-3 py-1 w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearch(false)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-1 hover:text-indigo-600"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-1 hover:text-indigo-600">
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
              href="/login"
              className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              <UserIcon className="h-5 w-5" />
              <span>{t("header.sign_in")}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
