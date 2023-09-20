import Hour from "./Hour";
import { hours } from "./datetimezonemath";

export default function Day({ hourStart }: { hourStart: number }) {
  return (
    <div className="day">
      {hours.map((h, i) => (
        <Hour key={`${h}-${hourStart}`} hourNum={hourStart + i} />
      ))}
    </div>
  );
}
