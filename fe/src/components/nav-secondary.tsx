import { Link } from "react-router-dom";
import { Send, type LucideIcon } from "lucide-react";

import { cn } from "@/app/utils/cn";
import { Badge } from "./ui/badge";
import FeedbackModal from "@/view/components/FeedbackModal";

export function NavSecondary({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
} & React.ComponentProps<"ul">) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className={cn("grid gap-0.5", className)}>
      <li>
        <FeedbackModal>
          <div className="flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs ring-ring transition-all cursor-pointer hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2">
            <Send className="h-4 w-4 shrink-0 translate-x-0.5 text-white" />
            <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium text-white flex items-center gap-2">
              Sugestões
              <Badge className="bg-[#72a514]">Novo</Badge>
            </div>
          </div>
        </FeedbackModal>
      </li>
      {items.map((item) => (
        <li key={item.title}>
          <Link
            to={item.url}
            className="flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs ring-ring transition-all cursor-not-allowed hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2"
          >
            <item.icon className="h-4 w-4 shrink-0 translate-x-0.5 text-white" />
            <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium text-white flex items-center gap-2">
              {item.title}
              <Badge className="bg-gray-500 hover:bg-gray-500">Em breve</Badge>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
