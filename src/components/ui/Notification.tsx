import { CheckCircle2Icon } from "lucide-react";
import { Alert } from "..";
import { cn } from "cn";
import type { NofiticationProps } from "@/types/interfaces";

export const Notification = ({
  className,
  title,
  description,
  isError
}: NofiticationProps) => {
  return (
    <Alert.Alert
      className={cn(
        "max-w-md bg-secondbg border-textsecond/50",
        className
      )}
      variant={isError ? "destructive" : "default"}
    >
      <CheckCircle2Icon />
      <Alert.AlertTitle className="text-textsecond">
        {title}
      </Alert.AlertTitle>
      <Alert.AlertDescription>
        {description}
      </Alert.AlertDescription>
    </Alert.Alert>
  );
};
