import { useEffect, useState } from "react";

const backupKey = "my-approx-loc";
const getBackup = () => window.sessionStorage.getItem(backupKey) || null;
const setBackup = (val: string) =>
  window.sessionStorage.setItem(backupKey, val);

export default function useApproxLocale() {
  const [loc, setLoc] = useState(getBackup() || "...");
  useEffect(() => {
    if (loc === "...") {
      fetch("http://ip-api.com/json/?fields=status,city")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            const approxLoc = `~${data.city}`;
            setBackup(approxLoc);
            setLoc(approxLoc);
          } else {
            setLoc("");
          }
        });
    }
  }, [loc]);
  return loc;
}
