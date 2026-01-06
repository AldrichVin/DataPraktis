// Re-export Prisma types
export type {
  User,
  AnalystProfile,
  Project,
  ProjectFile,
  Proposal,
  Milestone,
  Template,
  Conversation,
  Message,
  Transaction,
  Review,
  UserRole,
  ProjectStatus,
  ProposalStatus,
  MilestoneStatus,
  TransactionStatus,
  FileAccessLevel,
} from '@datapraktis/db';

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface RegisterClientInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface RegisterAnalystInput {
  email: string;
  password: string;
  name: string;
  phone?: string;
  bio?: string;
  headline?: string;
  skills: string[];
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// ============================================================================
// Project Types
// ============================================================================

export interface CreateProjectInput {
  templateId?: string;
  title: string;
  description: string;
  templateAnswers?: Record<string, unknown>;
  budgetMin?: number;
  budgetMax?: number;
  deadline?: Date;
}

export interface ProjectFilters {
  status?: string;
  templateId?: string;
  minBudget?: number;
  maxBudget?: number;
  skills?: string[];
}

// ============================================================================
// Proposal Types
// ============================================================================

export interface CreateProposalInput {
  projectId: string;
  coverLetter: string;
  proposedBudget: number;
  proposedDays: number;
  proposedMilestones: {
    title: string;
    description: string;
    amount: number;
    dueDate?: Date;
  }[];
}

// ============================================================================
// Template Types
// ============================================================================

export interface TemplateQuestion {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface TemplateMilestone {
  title: string;
  description: string;
  percentageOfBudget: number;
}

export interface TemplateDeliverable {
  title: string;
  description: string;
}

// ============================================================================
// Message Types
// ============================================================================

export interface SendMessageInput {
  conversationId: string;
  content: string;
  attachments?: string[];
}

// ============================================================================
// Payment Types
// ============================================================================

export interface CreatePaymentInput {
  projectId: string;
  milestoneId: string;
  amount: number;
}

export interface MidtransNotification {
  order_id: string;
  transaction_status: string;
  fraud_status?: string;
  payment_type: string;
  gross_amount: string;
  signature_key: string;
}
