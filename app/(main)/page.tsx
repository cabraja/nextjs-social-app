import HomepageTrending from "@/components/homepage/homepage-trending";

export default function Home() {
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
