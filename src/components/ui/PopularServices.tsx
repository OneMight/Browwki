import type { ServiceTop } from "@/shared/types/interfaces";
import { Progress } from "..";

export const PopularServices = (props: ServiceTop) => {
  return (
    <Progress.Progress
      value={props.completed_count}
      max={props.total_ordered}
    >
      <Progress.ProgressLabel
        className={
          "flex flex-row justify-between w-full items-center gap-2 text-black/60"
        }
      >
        <span>{props.service_name}</span>
        {props.completed_count}
      </Progress.ProgressLabel>
    </Progress.Progress>
  );
};
