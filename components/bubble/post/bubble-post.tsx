import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostWithProfile } from "@/types/prisma";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type PostProps = {
  post: PostWithProfile;
};

function BubblePost({ post }: PostProps) {
  return (
    <article className="w-full rounded-lg bg-zinc-900/70 py-4 px-5">
      <header className="flex items-center mb-2">
        <div className="flex items-center gap-x-1">
          <Avatar className="w-6 h-6">
            <AvatarImage src={post.owner.imageUrl} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <p className="text-xs">{post.owner.username}</p>
        </div>
      </header>
      <h5 className="text-xl font-semibold">{post.title}</h5>
      <p className="text-sm font-light mt-1">{post.textContent}</p>

      {post.codeContent && (
        <div className="theme-agate mt-4">
          <SyntaxHighlighter
            language="javascript"
            style={atomOneDark}
            wrapLongLines={true}
            customStyle={{
              maxHeight: "250px",
              overflowY: "scroll",
              marginTop: "0.5rem",
            }}
          >
            {post.codeContent}
          </SyntaxHighlighter>
        </div>
      )}
    </article>
  );
}

export default BubblePost;
