import getBubbleById from "@/actions/get-bubble-by-id";
import BubbleHeader from "@/components/bubble/bubble-header/bubble-header";
import BubbleNav from "@/components/bubble/bubble-nav/bubble-nav";

export async function BubblePage({ params }: { params: { bubbleId: string } }) {
  const bubble = await getBubbleById(params.bubbleId);

  if (!bubble) return <div>No bubble</div>;

  return (
    <div className="w-full">
      <BubbleHeader bubble={bubble} />

      <div className="flex gap-x-6 w-full mt-10">
        <BubbleNav bubble={bubble} />
        <div className="w-1/4 bg-zinc-500 rounded-lg h-[40vh]"></div>
      </div>
    </div>
  );
}

export default BubblePage;
