import Header from "@/components/header/header";
import SideNavigation from "@/components/side-navigation";
import getTopics from "@/actions/get-topics";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const topics = await getTopics();
  return (
    <>
      <Header />
      <div className="main-layout h-screen w-full flex items-stretch gap-x-8 py-[2%] px-[8%]">
        <div className="w-1/5 hidden sm:block h-full">
          <SideNavigation topics={topics} />
        </div>
        <div className="flex-1 overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </>
  );
}

export default MainLayout;
