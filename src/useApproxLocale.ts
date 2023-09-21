import { useEffect, useState } from "react";

const backupKey = "my-approx-loc";
const getBackup = () => window.sessionStorage.getItem(backupKey) || null;
const setBackup = (val: string) =>
  window.sessionStorage.setItem(backupKey, val);

export default function useApproxLocale() {
  const [loc, setLoc] = useState(getBackup() || "...");
  useEffect(() => {
    if (loc === "...") {
      fetch("https://geolocation-db.com/json/")
        .then((res) => res.json())
        .then(({ city }) => {
          if (city && typeof city === "string" && city.length > 0) {
            const approxLoc = `~${city}`;
            setBackup(approxLoc);
            setLoc(approxLoc);
          } else {
            setLoc("");
          }
        })
        .catch(() => setLoc(""));
    }
  }, [loc]);
  return loc;
}
