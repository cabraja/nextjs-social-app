import { BubbleAccessType } from "@prisma/client";

type NewBubbleProps = {
  name: string;
  description: string;
  accessType: BubbleAccessType;
};

export function validateNewBubble({
  name,
  description,
  accessType,
}: NewBubbleProps): boolean {
  if (name.length < 2 || name.length > 24) return false;
  if (description.length < 10) return false;
  if (!accessType) return false;

  return true;
}
