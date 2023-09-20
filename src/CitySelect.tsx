import cities from "./cities.json";

export default function CitySelect({ number }: { number: number }) {
  const id = `c${number}`;
  const checkboxId = `b${number}`;
  return (
    <div className="city-select">
      <select name={id} id={id}>
        <option value="">Select a city</option>
        {cities.map(({ city, countryCode, tz }, i) => (
          <option key={`${city}-${countryCode}-${tz}`} value={i}>
            {`${city} (${countryCode})`}
          </option>
        ))}
      </select>
      <label htmlFor={checkboxId} className="busy-box">
        <input type="checkbox" id={checkboxId} name={checkboxId} value="1" />
        Busy 9-5?
      </label>
    </div>
  );
}
