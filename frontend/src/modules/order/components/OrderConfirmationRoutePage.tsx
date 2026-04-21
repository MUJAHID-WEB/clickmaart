"use client";

import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import type { StorefrontOrderRecord } from "@/modules/store/server/getStorefrontCommerce";
import { useTranslation } from "react-i18next";

type OrderConfirmationRoutePageProps = {
  orderId?: string;
  order?: StorefrontOrderRecord;
};

export default function OrderConfirmationRoutePage({
  orderId,
  order,
}: OrderConfirmationRoutePageProps) {
  const { t } = useTranslation("common");
  const resolvedOrderId = order?.id ?? orderId ?? "Pending";

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-lg mx-auto">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">
          {t("order_confirmation.title")}
        </h1>
        <p className="mb-6">
          {t("order_confirmation.message")}{" "}
          <span className="font-semibold">{resolvedOrderId}</span>
        </p>
        {order ? (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left">
            <p className="text-sm text-slate-600">
              Status: <span className="font-semibold text-slate-900">{order.status}</span>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Payment:{" "}
              <span className="font-semibold text-slate-900">
                {order.paymentMethod}
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Total:{" "}
              <span className="font-semibold text-slate-900">
                ${order.total.toFixed(2)}
              </span>
            </p>
            {order.eta ? (
              <p className="mt-2 text-sm text-slate-600">
                ETA: <span className="font-semibold text-slate-900">{order.eta}</span>
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="flex justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {t("order_confirmation.continue_shopping")}
          </Link>
          <Link
            href={`/orders/${resolvedOrderId}`}
            className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50"
          >
            {t("order_confirmation.view_order")}
          </Link>
        </div>
      </div>
    </div>
  );
}
