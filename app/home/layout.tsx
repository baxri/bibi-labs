import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import LayoutWrapper from "../components/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <LayoutWrapper>
     <Header />
      <main>{children}</main>
      <Footer />
   </LayoutWrapper>
  );
}
