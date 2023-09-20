import type { FormEvent, FormEventHandler } from "react";
import CitySelect from "./CitySelect";
import ApproxLocale from "./ApproxLocale";

const imBusyKey = "im-busy";
const getImBusy = () => window.localStorage.getItem(imBusyKey) || null;
const setImBusy = () => window.localStorage.setItem(imBusyKey, "1");

type Attendee = {
  c: string;
  b: boolean;
};

export default function Form() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form: HTMLFormElement = e.currentTarget;
    const formData = new FormData(form);
    const attendeesObj: Record<string, Attendee> = {};
    let youBusy = false;
    formData.forEach((val, key) => {
      if (typeof val !== "string") return;
      if (key === "b0") {
        if (val === "1") {
          youBusy = true;
          setImBusy();
        }
        return;
      }
      if (key.startsWith("c") && val !== "") {
        attendeesObj[key.charAt(1)] = {
          c: val,
          b: false,
        };
      }
      if (key.startsWith("b")) {
        attendeesObj[key.charAt(1)].b = val === "1";
      }
    });
    const attendeesArr = Object.values(attendeesObj);
    const attendees = attendeesArr.map(({ c, b }) => `${c}${b ? "b" : "f"}`);
    const params: Record<string, string> = { a: attendees.join("-") };
    if (youBusy) {
      params.b = "1";
    }
    const searchParams = new URLSearchParams(params);
    window.location.search = searchParams.toString();
  };
  return (
    <form className="form" method="GET" onSubmit={handleSubmit}>
      <fieldset>
        <div className="city-select">
          <p className="mock-select">
            [You] <ApproxLocale />
          </p>
          <label htmlFor="b0" className="busy-box">
            <input
              type="checkbox"
              id="b0"
              name="b0"
              value="1"
              defaultChecked={getImBusy() === "1"}
            />
            Busy 9-5?
          </label>
        </div>
        {[1, 2, 3, 4, 5].map((num) => (
          <CitySelect key={`cs${num}`} number={num} />
        ))}
        <div className="center">
          <button type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  );
}
