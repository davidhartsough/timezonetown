import useApproxLocale from "./useApproxLocale";

export default function ApproxLocale() {
  const loc = useApproxLocale();
  return <span>{loc}</span>;
}
