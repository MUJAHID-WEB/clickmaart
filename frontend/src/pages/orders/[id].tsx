import Image from "next/image";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18nextConfig from "../../../next-i18next.config";
import {
  getStorefrontOrderRecord,
  type StorefrontOrderRecord,
} from "@/modules/store/server/getStorefrontCommerce";

const fallbackOrder = (id: string): StorefrontOrderRecord => ({
  id,
  date: new Date().toISOString().slice(0, 10),
  status: "Pending",
  currentStage: "pending",
  items: [],
  total: 0,
  shippingAddress: "Address unavailable",
  paymentMethod: "Cash on Delivery",
});

type OrderDetailsPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const OrderDetailsPage = ({ order }: OrderDetailsPageProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const resolvedOrder = order ?? fallbackOrder("unknown");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {t("order.title")} #{resolvedOrder.id}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">{t("order.items")}</h2>
            {resolvedOrder.items.length > 0 ? (
              resolvedOrder.items.map((item) => (
                <div key={item.id ?? item.name} className="flex items-center border-b py-4">
                  <div className="w-20 h-20 bg-gray-100 rounded mr-4 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      priority={false}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No line items were returned for this order yet.
              </p>
            )}
            <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
              <span>{t("order.total")}:</span>
              <span>${resolvedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">
              {t("order.shipping_info")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-600">
                  {t("order.shipping_address")}
                </h3>
                <p>{resolvedOrder.shippingAddress}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">
                  {t("order.payment_method")}
                </h3>
                <p>{resolvedOrder.paymentMethod}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">
                  {t("order.order_date")}
                </h3>
                <p>{resolvedOrder.date}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-600">
                  {t("order.order_status")}
                </h3>
                <p
                  className={`font-semibold ${
                    resolvedOrder.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {resolvedOrder.status}
                </p>
              </div>
            </div>
            {resolvedOrder.customerName || resolvedOrder.customerPhone ? (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {resolvedOrder.customerName ? (
                  <div>
                    <h3 className="font-medium text-gray-600">Customer</h3>
                    <p>{resolvedOrder.customerName}</p>
                  </div>
                ) : null}
                {resolvedOrder.customerPhone ? (
                  <div>
                    <h3 className="font-medium text-gray-600">Phone</h3>
                    <p>{resolvedOrder.customerPhone}</p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-4 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">{t("order.summary")}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{t("order.subtotal")}:</span>
                <span>${resolvedOrder.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("order.shipping")}:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                <span>{t("order.total")}:</span>
                <span>${resolvedOrder.total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 mb-2"
            >
              {t("order.print_invoice")}
            </button>
            <button
              onClick={() => router.push("/products")}
              className="w-full border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50"
            >
              {t("order.continue_shopping")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({
  locale,
  params,
}: GetServerSidePropsContext<{ id: string }>) {
  const id = typeof params?.id === "string" ? params.id : "unknown";
  const order = await getStorefrontOrderRecord(id);

  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? "en",
        ["common"],
        nextI18nextConfig,
      )),
      order,
    },
  };
}

export default OrderDetailsPage;
