import Header from "@/components/header/header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default MainLayout;
