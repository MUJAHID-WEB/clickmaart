"use client";

import { useCart } from "@/contexts/CartContext";
import {
  clickMaartMutationRequest,
  getClickMaartErrorMessage,
} from "@/lib/api/clickmaartBackend";
import { navigateTo } from "@/lib/client-navigation";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type CheckoutRoutePageProps = {
  surface?: string | null;
  tenantKey?: string | null;
};

export default function CheckoutRoutePage({
  surface,
  tenantKey,
}: CheckoutRoutePageProps) {
  const { t } = useTranslation("common");
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setSubmitError(null);
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await clickMaartMutationRequest<{ order: { id: string } }>({
        role: "public",
        path: "/storefront/orders",
        method: "POST",
        body: {
          ...formState,
          surface,
          tenantKey,
          items: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        },
      });

      clearCart();
      navigateTo(`/order-confirmation?orderId=${response.order.id}`);
    } catch (error) {
      setSubmitError(getClickMaartErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("checkout.title")}</h1>
        <p className="text-gray-600 mb-6">{t("cart.empty")}</p>
        <Link
          href="/products"
          className="inline-flex rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          {t("cart.continue_shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("checkout.title")}</h1>

      <form className="grid md:grid-cols-2 gap-8" onSubmit={handlePlaceOrder}>
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("checkout.shipping_info")}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">{t("checkout.full_name")}</label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">{t("checkout.address")}</label>
              <input
                type="text"
                name="address"
                value={formState.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">{t("checkout.city")}</label>
                <input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">{t("checkout.postal_code")}</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formState.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">{t("checkout.phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            {submitError ? (
              <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {submitError}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t("checkout.order_summary")}
          </h2>
          <div className="border rounded-lg p-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {t("checkout.quantity", { count: item.quantity })}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-semibold">
                <span>{t("checkout.total")}:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing order..." : t("checkout.place_order")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
