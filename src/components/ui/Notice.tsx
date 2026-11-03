import type { ReactNode } from "react";

type NoticeProps = {
  title: string;
  children: ReactNode;
};

export function Notice({ title, children }: NoticeProps) {
  return (
    <div
      className="rounded-lg border border-line bg-chip px-4 py-3 text-sm leading-6 text-foreground"
      role="note"
    >
      <p>
        <strong className="font-semibold">{title} </strong>
        {children}
      </p>
    </div>
  );
}
