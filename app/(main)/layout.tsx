import Header from "@/components/header/header";
import SideNavigation from "@/components/side-navigation";
import { Separator } from "@/components/ui/separator";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="main-layout w-full flex items-start gap-x-8 px-[6%] py-[4%]">
        <div className="w-1/5 hidden sm:block relative">
          <div className="sm:sticky top-0 block bg-zinc-700 rounded-xl h-[60vh]">
            <SideNavigation />
          </div>
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default MainLayout;
