import HomepageTrending from "@/components/homepage/homepage-trending";
import { initialProfile } from "@/lib/initial-profile";

export default async function Home() {
  const profile = await initialProfile();

  if (!profile) {
    return (
      <div>
        <h1>To do...</h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full">
        <HomepageTrending />
      </div>
      <div className="flex items-start w-full gap-x-5">
        <div className="flex-1 h-[120vh] rounded-xl basis-3/4 bg-slate-400"></div>
        <div className="flex-1 h-[32vh] rounded-xl basis-1/4 bg-slate-400"></div>
      </div>
    </div>
  );
}
