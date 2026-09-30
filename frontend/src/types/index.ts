export type EmployeeView = 
  | 'dashboard' 
  | 'documents' 
  | 'document-detail' 
  | 'knowledge-chat' 
  | 'activity' 
  | 'profile';

export type DocType = 'PDF' | 'DOCX' | 'DOC' | 'XLSX' | 'PPTX' | 'OTHER';

export interface DocumentItem {
  id: string;
  name: string;
  type: DocType;
  category: string;
  department: string;
  uploadedBy: string;
  uploaderEmpId?: string;
  isPersonal?: boolean;
  uploadDate: string;
  status: 'Ready' | 'Processing' | 'Failed';
  accessScope: string;
  description?: string;
  pages?: number;
  fileSize?: string;
  summaryText?: string;
  keyTakeaways?: string[];
  docCategory?: string;
  summary?: string;
  hasSummary?: boolean;
}

export interface EmployeeItem {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar?: string;
  role: 'Employee' | 'Manager' | 'Department Admin' | 'System Admin';
  accessScope: 'Personal Only' | 'Department Only' | 'Organization Wide';
  reportingManager?: string;
  employmentType?: 'Full Time' | 'Part Time' | 'Contract';
  joiningDate?: string;
  location?: string;
  bio?: string;
  skills?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  keyPoints?: string[];
  sources?: {
    id: string;
    documentId: number;
    title: string;
    docType: string;
    page: string;
  }[];
}

export interface ChatThread {
  id: string;
  title: string;
  timestamp: string;
  messagesCount: number;
  lastMessage?: string;
}

export interface PermissionRow {
  category: string;
  employee: 'View' | 'Edit' | 'No Access';
  manager: 'View' | 'Edit' | 'No Access';
  deptAdmin: 'View' | 'Edit' | 'No Access';
  systemAdmin: 'View' | 'Edit' | 'No Access';
}
