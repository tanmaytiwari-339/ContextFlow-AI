import { CloudUpload } from "lucide-react";

export default function UploadBox() {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

      <div className="border-2 border-dashed border-indigo-300 rounded-2xl py-10 px-6 text-center">

        <CloudUpload
            size={42}
            className="mx-auto text-indigo-600"
          />

          <h3 className="mt-4 text-2xl font-semibold text-slate-800">
            Drag & drop your files here
          </h3>

          <p className="mt-1 text-slate-500">
            or
          </p>

          <button className="mt-4 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
            Choose Files
          </button>

          <p className="mt-4 text-sm text-slate-400">
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
      </div>
    </div>
  );
}