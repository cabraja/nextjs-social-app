"use client";

export default function BubbleIdError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full">
      <p className="mx-auto text-center text-lg bg-red-800/30 border-red-900 rounded-lg px-8 py-3">
        {error.message}
      </p>
    </div>
  );
}
