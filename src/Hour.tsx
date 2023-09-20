import { hours } from "./datetimezonemath";

export default function Hour({ hourNum }: { hourNum: number }) {
  const hourText = hourNum <= 23 ? hours[hourNum] : hours[hourNum - 24];
  return (
    <div className={`hour h-${hourText}`}>
      <p>{hourText}</p>
    </div>
  );
}
