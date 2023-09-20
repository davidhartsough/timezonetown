import Form from "./Form";
import Table from "./Table";
import { isValidList, parseA } from "./parse-qs";

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const a = urlParams.get("a");
  if (a) {
    if (isValidList(a)) {
      const b = urlParams.get("b");
      const youBusy = b === "1";
      return <Table a={parseA(a)} youBusy={youBusy} />;
    }
  }
  if (urlParams.size > 0) {
    window.location.search = "";
  }
  return <Form />;
}
