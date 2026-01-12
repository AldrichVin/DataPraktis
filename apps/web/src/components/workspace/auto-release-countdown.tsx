'use client';

import { useEffect, useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AutoReleaseCountdownProps {
  autoReleaseAt: Date | string | null;
  status: string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const total = target - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, total };
}

export function AutoReleaseCountdown({
  autoReleaseAt,
  status,
  className,
}: AutoReleaseCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!autoReleaseAt || status !== 'SUBMITTED') {
      setTimeRemaining(null);
      return;
    }

    const targetDate = new Date(autoReleaseAt);

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(targetDate));

    // Update every minute (no need for seconds precision)
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [autoReleaseAt, status]);

  // Don't show if not submitted or no auto-release date
  if (!timeRemaining || status !== 'SUBMITTED') {
    return null;
  }

  const isUrgent = timeRemaining.days <= 3;
  const isExpired = timeRemaining.total <= 0;

  if (isExpired) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm',
          className
        )}
      >
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <div>
          <span className="font-medium text-green-800">
            Auto-release aktif
          </span>
          <p className="text-green-700 text-xs">
            Dana akan segera dilepas ke analyst
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border p-3 text-sm',
        isUrgent
          ? 'border-yellow-200 bg-yellow-50'
          : 'border-blue-200 bg-blue-50',
        className
      )}
    >
      {isUrgent ? (
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
      ) : (
        <Clock className="h-4 w-4 text-blue-600" />
      )}
      <div className="flex-1">
        <div className={cn('font-medium', isUrgent ? 'text-yellow-800' : 'text-blue-800')}>
          {timeRemaining.days > 0 && `${timeRemaining.days} hari `}
          {timeRemaining.hours > 0 && `${timeRemaining.hours} jam `}
          {timeRemaining.days === 0 && `${timeRemaining.minutes} menit `}
          tersisa
        </div>
        <p className={cn('text-xs', isUrgent ? 'text-yellow-700' : 'text-blue-700')}>
          {isUrgent
            ? 'Segera review! Dana akan auto-release jika tidak ada respon.'
            : 'Waktu review klien. Dana auto-release jika tidak ada respon.'}
        </p>
      </div>
      <div className="text-right">
        <div
          className={cn(
            'text-lg font-bold tabular-nums',
            isUrgent ? 'text-yellow-800' : 'text-blue-800'
          )}
        >
          {timeRemaining.days}
        </div>
        <div className={cn('text-xs', isUrgent ? 'text-yellow-600' : 'text-blue-600')}>
          hari
        </div>
      </div>
    </div>
  );
}

// Compact version for lists
export function AutoReleaseCountdownCompact({
  autoReleaseAt,
  status,
}: {
  autoReleaseAt: Date | string | null;
  status: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!autoReleaseAt || status !== 'SUBMITTED') {
      setTimeRemaining(null);
      return;
    }

    const targetDate = new Date(autoReleaseAt);
    setTimeRemaining(calculateTimeRemaining(targetDate));

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 60000);

    return () => clearInterval(interval);
  }, [autoReleaseAt, status]);

  if (!timeRemaining || status !== 'SUBMITTED') {
    return null;
  }

  const isUrgent = timeRemaining.days <= 3;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-xs',
        isUrgent ? 'text-yellow-600' : 'text-muted-foreground'
      )}
      title={`Auto-release dalam ${timeRemaining.days} hari ${timeRemaining.hours} jam`}
    >
      <Clock className="h-3 w-3" />
      {timeRemaining.days}h {timeRemaining.hours}j
    </span>
  );
}
