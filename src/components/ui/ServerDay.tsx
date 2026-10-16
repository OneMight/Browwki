import Badge from "@mui/material/Badge";
import {
  PickerDay,
  type PickerDayProps
} from "@mui/x-date-pickers/PickerDay";
import { Circle } from "lucide-react";

export function ServerDay(
  props: PickerDayProps & { highlightedDays?: number[] }
) {
  const {
    highlightedDays = [],
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.getDate()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <Circle className="size-2 bg-textsecond rounded-full" />
        ) : undefined
      }
    >
      <PickerDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}
