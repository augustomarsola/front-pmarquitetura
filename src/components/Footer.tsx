import { cn } from "@/lib/utils";

interface FooterProps {
  content: string;
  className?: string;
}

export function Footer({ content, className }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-col text-gray-400 text-sm w-full max-w-5xl mx-auto py-7",
        className,
      )}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </footer>
  );
}
