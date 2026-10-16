import type { ReactNode } from "react";

export const TextStatsBlock = (props: {
  title: string;
  value: number;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-lg">{props.title}</span>
      <span className="text-[16px] font-bold">
        {props.value} {props.children}
      </span>
    </div>
  );
};
