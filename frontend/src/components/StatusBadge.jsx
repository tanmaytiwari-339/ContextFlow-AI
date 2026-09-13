export default function StatusBadge({ status }) {
  const styles =
    status === "Processed"
      ? "bg-green-100 text-green-700"
      : "bg-indigo-100 text-indigo-700";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles}`}
    >
      {status}
    </span>
  );
}