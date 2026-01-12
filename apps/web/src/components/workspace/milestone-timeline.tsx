'use client';

import { Check, Clock, Loader2, AlertCircle, Send, RotateCcw, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency, formatDate } from '@/lib/utils';

type MilestoneStatus =
  | 'PENDING'
  | 'FUNDED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'REVISION_REQUESTED'
  | 'APPROVED'
  | 'DISPUTED';

interface Milestone {
  id: string;
  title: string;
  description?: string;
  amount: number;
  status: MilestoneStatus;
  dueDate?: string | null;
  fundedAt?: string | null;
  submittedAt?: string | null;
  approvedAt?: string | null;
  autoReleaseAt?: string | null;
  sortOrder: number;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
  className?: string;
  compact?: boolean;
}

const statusConfig: Record<
  MilestoneStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  PENDING: {
    label: 'Menunggu Dana',
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    icon: Clock,
  },
  FUNDED: {
    label: 'Terdanai',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
    icon: Wallet,
  },
  IN_PROGRESS: {
    label: 'Dikerjakan',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
    icon: Loader2,
  },
  SUBMITTED: {
    label: 'Menunggu Review',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    borderColor: 'border-yellow-500',
    icon: Send,
  },
  REVISION_REQUESTED: {
    label: 'Revisi',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-500',
    icon: RotateCcw,
  },
  APPROVED: {
    label: 'Selesai',
    color: 'text-green-600',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-500',
    icon: Check,
  },
  DISPUTED: {
    label: 'Sengketa',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-500',
    icon: AlertCircle,
  },
};

export function MilestoneTimeline({
  milestones,
  className,
  compact = false,
}: MilestoneTimelineProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);
  const completedCount = sortedMilestones.filter((m) => m.status === 'APPROVED').length;
  const progressPercent = (completedCount / sortedMilestones.length) * 100;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress Bar */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">
          {completedCount}/{sortedMilestones.length} milestone
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-muted" />

        <div className="space-y-4">
          {sortedMilestones.map((milestone, index) => {
            const config = statusConfig[milestone.status];
            const Icon = config.icon;
            const isCompleted = milestone.status === 'APPROVED';
            const isActive = ['IN_PROGRESS', 'SUBMITTED', 'REVISION_REQUESTED'].includes(
              milestone.status
            );

            return (
              <div
                key={milestone.id}
                className={cn(
                  'relative flex gap-4 p-4 rounded-lg border transition-colors',
                  isCompleted && 'bg-green-50 border-green-200',
                  isActive && 'bg-blue-50 border-blue-200',
                  !isCompleted && !isActive && 'bg-background'
                )}
              >
                {/* Status Icon */}
                <div
                  className={cn(
                    'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2',
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : config.borderColor,
                    !isCompleted && config.bgColor
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5',
                      isCompleted ? 'text-white' : config.color,
                      milestone.status === 'IN_PROGRESS' && 'animate-spin'
                    )}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium">
                        {index + 1}. {milestone.title}
                      </h4>
                      {!compact && milestone.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {milestone.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-primary">
                        {formatCurrency(milestone.amount)}
                      </p>
                      <p className={cn('text-xs', config.color)}>{config.label}</p>
                    </div>
                  </div>

                  {/* Dates */}
                  {!compact && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                      {milestone.dueDate && (
                        <span>Deadline: {formatDate(milestone.dueDate)}</span>
                      )}
                      {milestone.fundedAt && (
                        <span className="text-green-600">
                          Didanai: {formatDate(milestone.fundedAt)}
                        </span>
                      )}
                      {milestone.submittedAt && (
                        <span className="text-blue-600">
                          Disubmit: {formatDate(milestone.submittedAt)}
                        </span>
                      )}
                      {milestone.approvedAt && (
                        <span className="text-green-600">
                          Selesai: {formatDate(milestone.approvedAt)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Horizontal version for compact display
export function MilestoneTimelineHorizontal({
  milestones,
  className,
}: {
  milestones: Milestone[];
  className?: string;
}) {
  const sortedMilestones = [...milestones].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto pb-2', className)}>
      {sortedMilestones.map((milestone, index) => {
        const config = statusConfig[milestone.status];
        const Icon = config.icon;
        const isCompleted = milestone.status === 'APPROVED';
        const isLast = index === sortedMilestones.length - 1;

        return (
          <div key={milestone.id} className="flex items-center">
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm whitespace-nowrap',
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : config.bgColor + ' ' + config.color
              )}
              title={`${milestone.title}: ${config.label}`}
            >
              <Icon
                className={cn(
                  'h-4 w-4',
                  milestone.status === 'IN_PROGRESS' && 'animate-spin'
                )}
              />
              <span className="hidden sm:inline">{index + 1}</span>
              <span className="sm:hidden">{index + 1}</span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'w-6 h-0.5 mx-1',
                  isCompleted ? 'bg-green-500' : 'bg-muted'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
