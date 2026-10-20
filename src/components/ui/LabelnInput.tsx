import type { LabelnInputProps } from "@/shared/types/interfaces";
import { cn } from "cn";

export const LabelnInput = ({
  label,
  lastValue,
  className,
  type = "text",

  onChange
}: LabelnInputProps) => {
  return (
    <div
      className={cn("flex flex-col text-start", className)}
    >
      <label htmlFor={label} className="mb-1">
        {label}
      </label>
      <input
        type={type}
        id={label}
        className="bg-white p-2 rounded-2xl border border-textsecond/20 aria-selected:border-textsecond/80 active:border-textsecond/80
        focus:border-textsecond/80
        focus:outline-none"
        defaultValue={lastValue || ""}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
