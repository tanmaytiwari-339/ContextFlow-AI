import StatusBadge from "./StatusBadge";

const files = [
  {
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    date: "Sep 9, 2026",
    status: "Processed",
  },
  {
    name: "Meeting_Notes.docx",
    size: "450 KB",
    date: "Sep 8, 2026",
    status: "Processed",
  },
  {
    name: "Research_Paper.pdf",
    size: "5.1 MB",
    date: "Sep 7, 2026",
    status: "Processing",
  },
  {
    name: "Team_Guide.txt",
    size: "120 KB",
    date: "Sep 6, 2026",
    status: "Processed",
  },
];

export default function RecentUploadsTable() {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="px-6 py-4 border-b">
        <h2 className="text-2xl font-semibold">
          Recently Uploaded
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Size</th>
            <th className="text-left p-4">Date</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {files.map((file, index) => (
            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4">{file.name}</td>
              <td className="p-4">{file.size}</td>
              <td className="p-4">{file.date}</td>
              <td className="p-4">
                <StatusBadge status={file.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}