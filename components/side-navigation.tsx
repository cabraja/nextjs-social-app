"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Topic } from "@prisma/client";

type SideNavigationProps = {
  topics: Topic[];
};

function SideNavigation({ topics }: SideNavigationProps) {
  return (
    <div className="bg-zinc-900 rounded-lg px-5 py-5">
      <h3 className="text-lg font-semibold text-neutral-200">Popular Topics</h3>
      <Separator className="mt-3" />
      <Accordion type="single" collapsible>
        {topics &&
          topics.map((topic) => (
            <AccordionItem
              className="border-b-0"
              key={topic.id}
              value={topic.name}
            >
              <AccordionTrigger className="text-neutral-400 text-sm hover:no-underline py-3 hover:text-neutral-300 transition">
                {topic.name}
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  <li>test 1</li>
                  <li>test 2</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}

export default SideNavigation;
