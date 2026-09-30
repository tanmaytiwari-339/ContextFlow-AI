import { useState } from "react";

import {
  Upload,
  Search,
  MoreVertical,
  X,
  Eye,
  Download,
  Trash2,
  FileText,
  File,
} from "lucide-react";

function DocumentPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Employee Handbook.pdf",
      type: "PDF",
      department: "HR",
      size: "2.4 MB",
      uploadedBy: "Admin",
      uploadedAt: "Today",
    },
    {
      id: 2,
      name: "Engineering Guidelines.pdf",
      type: "PDF",
      department: "Engineering",
      size: "1.8 MB",
      uploadedBy: "Admin",
      uploadedAt: "Yesterday",
    },
    {
      id: 3,
      name: "Design System.docx",
      type: "DOCX",
      department: "Design",
      size: "3.2 MB",
      uploadedBy: "Admin",
      uploadedAt: "2 days ago",
    },
    {
      id: 4,
      name: "ML Project Guidelines.pdf",
      type: "PDF",
      department: "AI & ML",
      size: "4.1 MB",
      uploadedBy: "Admin",
      uploadedAt: "3 days ago",
    },
    {
      id: 5,
      name: "Company Policy.docx",
      type: "DOCX",
      department: "HR",
      size: "1.2 MB",
      uploadedBy: "Admin",
      uploadedAt: "5 days ago",
    },
  ]);

  const [uploadData, setUploadData] = useState({
    name: "",
    type: "PDF",
    department: "",
    size: "0 KB",
  });

  const filteredDocuments = documents.filter((document) => {
    const matchesSearch = `${document.name} ${document.department} ${document.uploadedBy}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "All Types" ||
      document.type === typeFilter;

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      document.department === departmentFilter;

    return matchesSearch && matchesType && matchesDepartment;
  });

  const getFileIcon = (type) => {
    if (type === "PDF") {
      return <FileText size={20} />;
    }

    return <File size={20} />;
  };

  const getFileColor = (type) => {
    if (type === "PDF") {
      return "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400";
    }

    return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
  };

  const handleUploadInput = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const extension = file.name
      .split(".")
      .pop()
      .toUpperCase();

    let fileType = "OTHER";

    if (extension === "PDF") {
      fileType = "PDF";
    } else if (extension === "DOC" || extension === "DOCX") {
      fileType = "DOCX";
    }

    const sizeInMB = file.size / (1024 * 1024);

    setUploadData({
      ...uploadData,
      name: file.name,
      type: fileType,
      size:
        sizeInMB >= 1
          ? `${sizeInMB.toFixed(1)} MB`
          : `${(file.size / 1024).toFixed(0)} KB`,
    });
  };

  const resetUploadForm = () => {
    setUploadData({
      name: "",
      type: "PDF",
      department: "",
      size: "0 KB",
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!uploadData.name || !uploadData.department) {
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: uploadData.name,
      type: uploadData.type,
      department: uploadData.department,
      size: uploadData.size,
      uploadedBy: "Admin",
      uploadedAt: "Just now",
    };

    setDocuments([newDocument, ...documents]);
    resetUploadForm();
    setShowUploadModal(false);
  };

  const handleView = (document) => {
    setSelectedDocument(document);
    setOpenMenu(null);
    setShowViewModal(true);
  };

  const handleDeleteClick = (document) => {
    setSelectedDocument(document);
    setOpenMenu(null);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setDocuments(
      documents.filter(
        (document) => document.id !== selectedDocument.id
      )
    );

    setSelectedDocument(null);
    setShowDeleteModal(false);
  };

  const handleDownload = (document) => {
    const content = `ContextFlow AI

Document: ${document.name}
Department: ${document.department}
Uploaded By: ${document.uploadedBy}`;

    const blob = new Blob([content], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");

    link.href = url;
    link.download = `${document.name}.txt`;

    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    URL.revokeObjectURL(url);

    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-12 py-8 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Documents
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage organizational documents and files.
          </p>
        </div>

        <button
          onClick={() => {
            resetUploadForm();
            setShowUploadModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Upload size={18} />
          Upload Document
        </button>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-indigo-500/20"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option>All Types</option>
            <option>PDF</option>
            <option>DOCX</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>AI & ML</option>
            <option>HR</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-visible rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Document
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Department
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Size
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Uploaded By
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Uploaded
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((document) => (
                <tr
                  key={document.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${getFileColor(
                          document.type
                        )}`}
                      >
                        {getFileIcon(document.type)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {document.name}
                        </p>

                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {document.type}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {document.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {document.size}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                    {document.uploadedBy}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {document.uploadedAt}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === document.id
                              ? null
                              : document.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === document.id && (
                        <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg dark:border-slate-700 dark:bg-slate-900">
                          <button
                            onClick={() =>
                              handleView(document)
                            }
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() =>
                              handleDownload(document)
                            }
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <Download size={16} />
                            Download
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteClick(document)
                            }
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    No documents found
                  </p>

                  <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                    Try changing your search or filters.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Upload Document
                </h2>

                <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                  Add a document to your organization.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowUploadModal(false);
                  resetUploadForm();
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleUpload}
              className="space-y-5 p-6"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Select File
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                />

                {uploadData.name && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Selected:{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {uploadData.name}
                    </span>
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Department
                </label>

                <select
                  name="department"
                  value={uploadData.department}
                  onChange={handleUploadInput}
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="">
                    Select Department
                  </option>

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="Design">Design</option>

                  <option value="AI & ML">AI & ML</option>

                  <option value="HR">HR</option>
                </select>
              </div>

              {uploadData.name && (
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      File type
                    </span>

                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {uploadData.type}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      File size
                    </span>

                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {uploadData.size}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    resetUploadForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Document Modal */}
      {showViewModal && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Document Details
              </h2>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${getFileColor(
                    selectedDocument.type
                  )}`}
                >
                  {getFileIcon(selectedDocument.type)}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-white">
                    {selectedDocument.name}
                  </h3>

                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {selectedDocument.type}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDocument.department}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    File Size
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDocument.size}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Uploaded By
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDocument.uploadedBy}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Uploaded
                  </p>

                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                    {selectedDocument.uploadedAt}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
              <button
                onClick={() => handleDownload(selectedDocument)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Download size={16} />
                Download
              </button>

              <button
                onClick={() => setShowViewModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedDocument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl dark:bg-slate-900">
            <div className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                <Trash2 size={22} />
              </div>

              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Delete Document
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {selectedDocument.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 dark:border-slate-700">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedDocument(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteConfirm}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentPage;