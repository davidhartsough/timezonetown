import Day from "./Day";
import cities from "./cities.json";
import { getTimeNumFromZone } from "./datetimezonemath";
import useApproxLocale from "./useApproxLocale";
import "./hour.css";

type Col = {
  tzNum: number;
  titles: string[];
  busy: boolean;
};

export default function Table({
  a,
  youBusy,
}: {
  a: string[][];
  youBusy: boolean;
}) {
  const approxLoc = useApproxLocale();
  const columns: Col[] = [
    {
      tzNum: 5,
      titles: [`[You] ${approxLoc}`],
      busy: youBusy,
    },
  ];
  a.forEach(([c, b]) => {
    const cityData = cities[Number(c)];
    const tzhn = getTimeNumFromZone(cityData.tz);
    const name = cityData.city; //`${cityData.city} (${cityData.countryCode})`;
    const busy = b === "b";
    const index = columns.findIndex(({ tzNum }) => tzNum === tzhn);
    if (index >= 0) {
      columns[index].titles.push(name);
      if (busy) {
        columns[index].busy = true;
      }
    } else {
      columns.push({
        tzNum: tzhn,
        titles: [name],
        busy,
      });
    }
  });
  return (
    <div className="center small">
      <div className="headers flex">
        {columns.map(({ titles }) => (
          <div key={`${titles.join("")}-header`} className="col col-header">
            <p>{titles.join(" / ")}</p>
          </div>
        ))}
      </div>
      <div className="days flex">
        {columns.map(({ titles, busy, tzNum }) => (
          <div
            key={`${titles.join("")}-${tzNum}`}
            className={`col ${busy ? "busy" : "free"}`}
          >
            <Day hourStart={tzNum} />
          </div>
        ))}
      </div>
    </div>
  );
}
