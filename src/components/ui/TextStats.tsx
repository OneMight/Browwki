import type { TextStatsProps } from "@/shared/types/interfaces";
import { Progress } from "..";
import { TextStatsBlock } from "./TextStatsBlock";

export const TextStats = ({
  cancelled_appointments,
  completed_appointments,
  total_appointments,
  total_revenue,
  waiting_appointments
}: TextStatsProps) => {
  return (
    <div className="flex flex-col bg-white p-3 rounded-2xl border border-textsecond/20 gap-4">
      <div>
        <span className="text-textsecond/80">
          Обработано клиентов
        </span>
        <Progress.Progress
          value={completed_appointments}
          max={total_appointments}
          className={"border-b border-textsecond/20 pb-4"}
        >
          <Progress.ProgressLabel
            className={
              "flex flex-row items-center gap-2 text-xl text-black/60"
            }
          >
            <span className="text-5xl text-black">
              {completed_appointments}{" "}
            </span>
            из {total_appointments}
          </Progress.ProgressLabel>
        </Progress.Progress>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-y-5">
        <TextStatsBlock
          title={"Записалось"}
          value={total_appointments}
        />
        <TextStatsBlock
          title={"Ожидают визита"}
          value={waiting_appointments}
        />
        <TextStatsBlock
          title={"Отмены"}
          value={cancelled_appointments}
        />
        <TextStatsBlock
          title={"Выручка"}
          value={total_revenue}
        >
          <i className="nbrb-icon">BYN</i>
        </TextStatsBlock>
      </div>
    </div>
  );
};
