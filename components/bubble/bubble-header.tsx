import Image from "next/image";

export function BubbleHeader() {
  return (
    <div
      style={{ backgroundImage: "url(https://github.com/shadcn.png)" }}
      className="w-full bg-cover rounded-lg relative"
    >
      <div className="w-full h-full flex rounded-lg bg-neutral-900/90 py-3 px-5">
        <div
          className="
        aspect-square
        h-[16vh]
        w-[16vh]
        relative
        overflow-hidden
        rounded-full
        translate-y-8
        "
        >
          <Image
            fill
            src="https://github.com/shadcn.png"
            alt={"test"}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
        </div>

        <div className="flex-1 flex flex-col px-4 justify-center">
          <h3 className="font-semibold text-2xl">Bubble Name</h3>
          <p>Users: 129 | Posts: 21</p>
        </div>
      </div>
    </div>
  );
}

export default BubbleHeader;
