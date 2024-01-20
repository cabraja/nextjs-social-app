import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import icon from "@/public/img/bubble-svg.svg";

export default function Page() {
  return (
    <div className="h-screen w-full flex items-stretch">
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-start w-3/5">
          <div className="flex items-center justify-start gap-x-2">
            <Image src={icon} alt="Bubbles" width={60} height={60} />
            <h1 className="font-semibold text-4xl">
              Welcome Back To BitBubble!
            </h1>
          </div>
          <div className="my-4 text text-neutral-300">
            <p>
              Access the community of over a 1000 developers. Disscus anything
              related to web development, design, software testing, games and
              more.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex bg-zinc-100 items-center justify-center ">
        <SignIn />
      </div>
    </div>
  );
}
