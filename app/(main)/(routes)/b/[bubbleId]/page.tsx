import getBubbleById from "@/actions/get-bubble-by-id";
import BubbleHeader from "@/components/bubble/bubble-header/bubble-header";

export async function BubblePage({ params }: { params: { bubbleId: string } }) {
  const bubble = await getBubbleById(params.bubbleId);

  if (!bubble) return <div>No bubble</div>;

  return (
    <div className="w-full">
      <BubbleHeader bubble={bubble} />
    </div>
  );
}

export default BubblePage;
