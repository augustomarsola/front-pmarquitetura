import { cn } from "@/lib/utils";

interface FooterProps {
  content: string;
  className?: string;
}

export function Footer({ content, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col text-gray-400 text-xs w-full max-w-5xl mx-auto p-7 lg:px-0",
        className,
      )}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </footer>
  );
}
