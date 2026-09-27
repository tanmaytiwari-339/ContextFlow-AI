import { DocumentItem, EmployeeItem, ChatMessage, ChatThread, PermissionRow } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Company Leave Policy.pdf',
    type: 'PDF',
    category: 'HR Policies',
    department: 'HR',
    uploadedBy: 'Admin',
    uploadDate: 'Sep 10, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: "Company's official leave policy covering types of leave, eligibility, application process and general guidelines.",
    pages: 18,
    fileSize: '2.4 MB',
    summaryText: "This document outlines the company's leave policy, including types of leave, eligibility criteria, application process, approval workflow, and important guidelines. It covers annual leave, sick leave, maternity and paternity leave, and special leave. Employees must apply for leave through the HR portal and get manager approval. The policy also specifies the maximum leave entitlement, carry-forward rules, and conditions for leave encashment.",
    keyTakeaways: [
      'Employees are entitled to 20 days of annual leave per year.',
      'Sick leave requires medical proof for more than 3 consecutive days.',
      'Maternity leave is 26 weeks and paternity leave is 2 weeks.',
      'Leave applications must be submitted through the HR portal.',
      'Unutilized leave can be carried forward up to 10 days (as per policy).'
    ]
  },
  {
    id: 'doc-2',
    name: 'Engineering Guidelines.docx',
    type: 'DOCX',
    category: 'Technical',
    department: 'Engineering',
    uploadedBy: 'Admin',
    uploadDate: 'Sep 08, 2025',
    status: 'Ready',
    accessScope: 'Engineering Only',
    description: 'Development, security, git branch hygiene, and safety guidelines for all software engineers.',
    pages: 34,
    fileSize: '3.8 MB'
  },
  {
    id: 'doc-3',
    name: 'Project Plan Q3.xlsx',
    type: 'XLSX',
    category: 'Project Reports',
    department: 'Product',
    uploadedBy: 'Riya Sharma',
    uploadDate: 'Sep 06, 2025',
    status: 'Ready',
    accessScope: 'Managers Only',
    description: 'Quarterly roadmap targets, sprint deliverables, and resource allocation models.',
    pages: 8,
    fileSize: '1.2 MB'
  },
  {
    id: 'doc-4',
    name: 'Remote Work Policy.pdf',
    type: 'PDF',
    category: 'HR Policies',
    department: 'Admin',
    uploadedBy: 'Admin',
    uploadDate: 'Sep 05, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Guidelines for remote work arrangements, eligibility, core hours, and expectations for employees.',
    pages: 12,
    fileSize: '1.8 MB'
  },
  {
    id: 'doc-5',
    name: 'Q3 Review Presentation.pptx',
    type: 'PPTX',
    category: 'Presentations',
    department: 'Finance',
    uploadedBy: 'Aarav Mehta',
    uploadDate: 'Sep 03, 2025',
    status: 'Ready',
    accessScope: 'Department Only',
    description: 'Executive briefing deck covering third-quarter operational milestones and financial health.',
    pages: 45,
    fileSize: '6.4 MB'
  },
  {
    id: 'doc-6',
    name: 'Project Reporting Template.xlsx',
    type: 'XLSX',
    category: 'Templates',
    department: 'Engineering',
    uploadedBy: 'Admin',
    uploadDate: 'Sep 01, 2025',
    status: 'Ready',
    accessScope: 'Engineering Only',
    description: 'Standard template for project milestone reporting, sprint burndown, and risk registers.',
    pages: 4,
    fileSize: '0.9 MB'
  },
  {
    id: 'doc-7',
    name: 'Onboarding Checklist.doc',
    type: 'DOC',
    category: 'HR Templates',
    department: 'HR',
    uploadedBy: 'Ananya Patel',
    uploadDate: 'Aug 30, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Comprehensive onboarding path, setup checklist, and mentor contact list for new team members.',
    pages: 10,
    fileSize: '1.1 MB'
  },
  {
    id: 'doc-8',
    name: 'Employee Handbook.pdf',
    type: 'PDF',
    category: 'Manual',
    department: 'HR',
    uploadedBy: 'Admin',
    uploadDate: 'Aug 28, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Company rules, code of conduct, core benefits, culture tenets, and general policies for all staff.',
    pages: 52,
    fileSize: '4.5 MB'
  },
  {
    id: 'doc-9',
    name: 'IT Security Guidelines.pdf',
    type: 'PDF',
    category: 'Security',
    department: 'IT',
    uploadedBy: 'Vikram Singh',
    uploadDate: 'Aug 20, 2025',
    status: 'Processing',
    accessScope: 'Restricted',
    description: 'Mandatory protocols for zero-trust endpoint security, 2FA, data classification, and incident handling.',
    pages: 22,
    fileSize: '2.9 MB'
  },
  {
    id: 'doc-10',
    name: 'Performance Review Process.docx',
    type: 'DOCX',
    category: 'Manual',
    department: 'HR',
    uploadedBy: 'Admin',
    uploadDate: 'Aug 15, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Annual performance cycle calendar, peer appraisal guidelines, rating scale, and self-review steps.',
    pages: 16,
    fileSize: '1.4 MB'
  },
  {
    id: 'doc-11',
    name: 'Maternity Leave Policy.pdf',
    type: 'PDF',
    category: 'HR Policies',
    department: 'HR',
    uploadedBy: 'Admin',
    uploadDate: 'Aug 10, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Comprehensive guidelines for maternity, paternity, adoption and parental care benefits.',
    pages: 14,
    fileSize: '1.7 MB'
  },
  {
    id: 'doc-12',
    name: 'Budget Report 2025.xlsx',
    type: 'XLSX',
    category: 'Finance',
    department: 'Finance',
    uploadedBy: 'Meera Suresh',
    uploadDate: 'Aug 25, 2025',
    status: 'Ready',
    accessScope: 'Managers Only',
    description: 'Consolidated fiscal year capital expenditures, team budgets, and forecasted run rates.',
    pages: 12,
    fileSize: '2.1 MB'
  },
  {
    id: 'doc-13',
    name: 'Research Paper - AI.pdf',
    type: 'PDF',
    category: 'Research',
    department: 'R&D',
    uploadedBy: 'Tanmay Tiwari',
    uploadDate: 'Aug 20, 2025',
    status: 'Ready',
    accessScope: 'Department Only',
    description: 'Internal evaluation of retrieval augmented generation architectures and localized vector indices.',
    pages: 28,
    fileSize: '3.6 MB'
  },
  {
    id: 'doc-14',
    name: 'Meeting Minutes.docx',
    type: 'DOCX',
    category: 'Operations',
    department: 'Operations',
    uploadedBy: 'Sneha Iyer',
    uploadDate: 'Aug 18, 2025',
    status: 'Ready',
    accessScope: 'All Employees',
    description: 'Executive committee minutes detailing strategic quarterly priorities and cross-team actions.',
    pages: 7,
    fileSize: '0.8 MB'
  }
];

export const INITIAL_EMPLOYEES: EmployeeItem[] = [
  {
    id: 'emp-1',
    empId: 'EMP1005',
    name: 'Tanmay Tiwari',
    email: 'tanmay.tiwari@company.com',
    phone: '+91 98765 43210',
    department: 'Engineering',
    position: 'Software Developer',
    status: 'Active',
    lastActive: 'Today, 10:24 AM',
    role: 'Employee',
    accessScope: 'Department Only',
    reportingManager: 'Vikas Kumar (EMP1001)',
    employmentType: 'Full Time',
    joiningDate: 'Jan 15, 2024',
    location: 'Bangalore, India',
    bio: 'Passionate about leveraging AI to make organizational knowledge accessible, secure and useful for everyone. Always learning, always building.',
    skills: ['System Administration', 'Access Control', 'Document Management', 'AI & NLP', 'Team Management', 'Problem Solving', 'Cloud Infrastructure']
  },
  {
    id: 'emp-2',
    empId: 'EMP1023',
    name: 'Riya Sharma',
    email: 'riya.sharma@company.com',
    phone: '+91 98765 43211',
    department: 'HR',
    position: 'HR Executive',
    status: 'Active',
    lastActive: 'Today, 09:15 AM',
    role: 'Manager',
    accessScope: 'Department Only',
    reportingManager: 'Pooja Verma (EMP1002)',
    employmentType: 'Full Time',
    joiningDate: 'Mar 10, 2023',
    location: 'Mumbai, India'
  },
  {
    id: 'emp-3',
    empId: 'EMP1041',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@company.com',
    phone: '+91 98765 43212',
    department: 'Finance',
    position: 'Finance Analyst',
    status: 'Active',
    lastActive: 'Yesterday, 06:42 PM',
    role: 'Employee',
    accessScope: 'Department Only',
    reportingManager: 'Rohan Joshi (EMP1003)',
    employmentType: 'Full Time',
    joiningDate: 'Jul 01, 2024',
    location: 'Delhi, India'
  },
  {
    id: 'emp-4',
    empId: 'EMP1087',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@company.com',
    phone: '+91 98765 43213',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'Active',
    lastActive: 'Sep 10, 2025',
    role: 'Manager',
    accessScope: 'Department Only',
    reportingManager: 'Tanmay Tiwari (EMP1005)',
    employmentType: 'Full Time',
    joiningDate: 'Nov 12, 2022',
    location: 'Bangalore, India'
  },
  {
    id: 'emp-5',
    empId: 'EMP1102',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@company.com',
    phone: '+91 98765 43214',
    department: 'Operations',
    position: 'Operations Executive',
    status: 'Active',
    lastActive: 'Sep 10, 2025',
    role: 'Employee',
    accessScope: 'Department Only',
    reportingManager: 'Sneha Iyer (EMP1087)',
    employmentType: 'Full Time',
    joiningDate: 'Feb 18, 2024',
    location: 'Pune, India'
  },
  {
    id: 'emp-6',
    empId: 'EMP1116',
    name: 'Ananya Patel',
    email: 'ananya.patel@company.com',
    phone: '+91 98765 43215',
    department: 'Engineering',
    position: 'QA Engineer',
    status: 'Active',
    lastActive: 'Sep 09, 2025',
    role: 'Employee',
    accessScope: 'Department Only',
    reportingManager: 'Tanmay Tiwari (EMP1005)',
    employmentType: 'Full Time',
    joiningDate: 'Aug 01, 2023',
    location: 'Hyderabad, India'
  },
  {
    id: 'emp-7',
    empId: 'EMP1130',
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    phone: '+91 98765 43216',
    department: 'IT',
    position: 'System Administrator',
    status: 'Inactive',
    lastActive: 'Sep 05, 2025',
    role: 'Department Admin',
    accessScope: 'Department Only',
    reportingManager: 'Admin',
    employmentType: 'Full Time',
    joiningDate: 'Sep 15, 2021',
    location: 'Bangalore, India'
  },
  {
    id: 'emp-8',
    empId: 'EMP1152',
    name: 'Meera Suresh',
    email: 'meera.suresh@company.com',
    phone: '+91 98765 43217',
    department: 'Research',
    position: 'Research Associate',
    status: 'Active',
    lastActive: 'Sep 10, 2025',
    role: 'Employee',
    accessScope: 'Department Only',
    reportingManager: 'Tanmay Tiwari (EMP1005)',
    employmentType: 'Full Time',
    joiningDate: 'May 05, 2024',
    location: 'Chennai, India'
  }
];

export const PERMISSION_MATRIX_DATA: PermissionRow[] = [
  {
    category: 'Company Policies',
    employee: 'View',
    manager: 'View',
    deptAdmin: 'View',
    systemAdmin: 'View'
  },
  {
    category: 'Department Documents',
    employee: 'View',
    manager: 'View',
    deptAdmin: 'Edit',
    systemAdmin: 'View'
  },
  {
    category: 'Project Reports',
    employee: 'View',
    manager: 'Edit',
    deptAdmin: 'Edit',
    systemAdmin: 'View'
  },
  {
    category: 'HR Documents',
    employee: 'No Access',
    manager: 'View',
    deptAdmin: 'Edit',
    systemAdmin: 'View'
  },
  {
    category: 'Financial Reports',
    employee: 'No Access',
    manager: 'No Access',
    deptAdmin: 'View',
    systemAdmin: 'View'
  },
  {
    category: 'Research & Development',
    employee: 'View',
    manager: 'View',
    deptAdmin: 'Edit',
    systemAdmin: 'View'
  },
  {
    category: 'Legal Documents',
    employee: 'No Access',
    manager: 'View',
    deptAdmin: 'View',
    systemAdmin: 'View'
  },
  {
    category: 'Confidential Documents',
    employee: 'No Access',
    manager: 'No Access',
    deptAdmin: 'Edit',
    systemAdmin: 'View'
  }
];

export const RECENT_CHATS: ChatThread[] = [
  {
    id: 'chat-1',
    title: 'What is our work-from-home policy?',
    timestamp: '2 hours ago',
    messagesCount: 2,
    lastMessage: 'According to the Remote Work Policy, employees can work remotely up to 3 days per week...'
  },
  {
    id: 'chat-2',
    title: 'Leave encashment rules',
    timestamp: '1 day ago',
    messagesCount: 4,
    lastMessage: 'Unutilized leave can be encashed during year-end cycles up to a maximum of 10 days.'
  },
  {
    id: 'chat-3',
    title: 'Performance review process',
    timestamp: '2 days ago',
    messagesCount: 3,
    lastMessage: 'Self-appraisals must be submitted by September 25th on the HR Portal.'
  },
  {
    id: 'chat-4',
    title: 'How to apply for maternity leave?',
    timestamp: '3 days ago',
    messagesCount: 5,
    lastMessage: 'Maternity leave applications require medical practitioner certification 30 days prior.'
  },
  {
    id: 'chat-5',
    title: 'IT security guidelines',
    timestamp: '4 days ago',
    messagesCount: 2,
    lastMessage: 'Hardware encryption is mandatory on all macOS and Windows company endpoints.'
  },
  {
    id: 'chat-6',
    title: 'Expense reimbursement',
    timestamp: '5 days ago',
    messagesCount: 3,
    lastMessage: 'Submit bills with GST invoice before the 25th of every month.'
  },
  {
    id: 'chat-7',
    title: 'Code of conduct',
    timestamp: '1 week ago',
    messagesCount: 2,
    lastMessage: 'Refer to Section 3 of the Employee Handbook for professional guidelines.'
  },
  {
    id: 'chat-8',
    title: 'Remote work guidelines',
    timestamp: '1 week ago',
    messagesCount: 4,
    lastMessage: 'Core hours are 10:00 AM to 5:00 PM IST across all distributed squads.'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'What is our work-from-home policy?',
    timestamp: '10:24 AM'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: "According to the company's Remote Work Policy, employees can work remotely up to 3 days per week, subject to manager approval and business requirements. Full details including eligibility, guidelines and expectations are provided in the policy document.",
    timestamp: '10:24 AM',
    keyPoints: [
      'Up to 3 days per week of remote work',
      'Requires manager approval',
      'Employees must be available during core working hours',
      'Certain roles may not be eligible (mentioned in the document)',
      'Full guidelines are in the Remote Work Policy document'
    ],
    sources: [
      {
        id: 's-1',
        title: 'Remote Work Policy.pdf',
        docType: 'PDF',
        page: 'Page 4 – Work from home guidelines'
      },
      {
        id: 's-2',
        title: 'Employee Handbook.docx',
        docType: 'DOC',
        page: 'Page 12 – Flexible work arrangements'
      }
    ]
  }
];

export const SUGGESTED_QUESTIONS = [
  'What is the leave policy?',
  'How to apply for maternity leave?',
  'What is the expense reimbursement process?',
  'Which documents mention performance reviews?',
  'What are the IT security guidelines?'
];
