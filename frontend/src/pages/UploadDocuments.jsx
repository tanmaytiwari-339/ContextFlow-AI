import RecentUploadsTable from "../components/RecentUploadsTable";
import UploadBox from "../components/UploadBox";

export default function UploadDocuments() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      <h1 className="text-4xl font-bold text-slate-900">
        Upload Documents
      </h1>

      <p className="mt-2 text-slate-500">
        Upload PDF, DOC, DOCX, TXT and let AI do the rest.
      </p>

      <div className="mt-6">
        <UploadBox />
      </div>

      <div className="mt-6">
        <RecentUploadsTable />
      </div>

    </div>
  );
}