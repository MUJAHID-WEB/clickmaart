import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PublicRouteMigrationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col" dir="ltr">
      <Header />
      <main className="flex-grow container mx-auto px-4 pb-8">{children}</main>
      <Footer />
    </div>
  );
}
