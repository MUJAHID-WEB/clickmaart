import ProductCatalogPage from "@/modules/catalog/components/ProductCatalogPage";
import ProductDetailPage from "@/modules/catalog/components/ProductDetailPage";
import CartRoutePage from "@/modules/order/components/CartRoutePage";
import CheckoutRoutePage from "@/modules/order/components/CheckoutRoutePage";
import OrderConfirmationRoutePage from "@/modules/order/components/OrderConfirmationRoutePage";
import { notFound } from "next/navigation";
import type { TenantSurface } from "@/lib/tenant/resolveTenantContext";
import {
  getStorefrontCatalogRecords,
  getStorefrontOrderRecord,
} from "../server/getStorefrontCommerce";
import { getStorefrontSnapshot } from "../server/getStorefrontSnapshot";
import PublicHomePage from "./PublicHomePage";
import StorefrontAboutPage from "./StorefrontAboutPage";
import StorefrontContactPage from "./StorefrontContactPage";
import StorefrontExperienceShell from "./StorefrontExperienceShell";

export default async function StorefrontRouteRenderer({
  segments = [],
  orderId,
  previewSurface,
  previewTenantKey,
  previewBasePath,
}: {
  segments?: string[];
  orderId?: string;
  previewSurface?: TenantSurface;
  previewTenantKey?: string | null;
  previewBasePath?: string;
}) {
  const snapshot = await getStorefrontSnapshot({
    previewSurface,
    previewTenantKey,
    previewBasePath,
  });

  const [firstSegment, secondSegment] = segments;
  const storefrontSurface = previewSurface ?? snapshot.surface;
  const storefrontTenantKey = snapshot.tenantKey ?? previewTenantKey ?? null;
  const needsCatalog = segments.length === 0 || firstSegment === "products";
  const products = needsCatalog
    ? await getStorefrontCatalogRecords({
        surface: storefrontSurface,
        tenantKey: storefrontTenantKey,
      })
    : [];

  if (segments.length === 0) {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="home"
        title="Public Storefront Entry"
        description="Shared public commerce routes now adapt to core marketplace, admin public store, and retailer public store ownership without breaking the existing design."
      >
        <PublicHomePage products={products} />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "products" && !secondSegment) {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="catalog"
        title="Catalog and Product Discovery"
        description="The product grid, filters, and category discovery flow remain shared while storefront identity and tenant context stay visible."
      >
        <ProductCatalogPage initialProducts={products} />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "products" && secondSegment) {
    const product = products.find((entry) => entry.id === secondSegment);

    if (!product) {
      notFound();
    }

    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="product"
        title="Product Details"
        description="Product detail pages now inherit storefront context so admin and retailer public stores can share one route foundation."
      >
        <ProductDetailPage
          product={product}
          relatedProducts={products}
          reviews={[]}
        />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "cart") {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="cart"
        title="Cart Review"
        description="Cart behavior remains aligned across shared marketplace, admin public store, and retailer public store journeys."
      >
        <CartRoutePage />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "checkout") {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="checkout"
        title="Checkout"
        description="Checkout now stays visually aligned with storefront ownership while customer registration and login remain available from the same public shell."
      >
        <CheckoutRoutePage
          surface={snapshot.surface}
          tenantKey={snapshot.tenantKey ?? null}
        />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "order-confirmation") {
    const order = orderId ? await getStorefrontOrderRecord(orderId) : undefined;

    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="confirmation"
        title="Order Confirmation"
        description="Order confirmation remains part of the shared storefront experience so storefront branding and customer follow-up stay consistent."
      >
        <OrderConfirmationRoutePage orderId={orderId} order={order} />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "about") {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="about"
        title="About This Storefront"
        description="About pages are now ready for the core marketplace, admin public store, and retailer public store experiences."
      >
        <StorefrontAboutPage snapshot={snapshot} />
      </StorefrontExperienceShell>
    );
  }

  if (firstSegment === "contact") {
    return (
      <StorefrontExperienceShell
        snapshot={snapshot}
        section="contact"
        title="Customer Contact and Support"
        description="Contact pages now align with tenant-aware storefront ownership and shared public commerce routing."
      >
        <StorefrontContactPage snapshot={snapshot} />
      </StorefrontExperienceShell>
    );
  }

  notFound();
}
