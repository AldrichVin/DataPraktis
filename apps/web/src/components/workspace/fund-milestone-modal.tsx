'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Shield, CreditCard, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface FundMilestoneModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  milestoneId: string;
  milestoneAmount: number;
  projectId: string;
  milestoneName?: string;
}

export function FundMilestoneModal({
  open,
  onOpenChange,
  milestoneId,
  milestoneAmount,
  projectId,
  milestoneName = 'Milestone 1',
}: FundMilestoneModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFundMilestone = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Create payment for milestone
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          milestoneId,
          projectId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat pembayaran');
      }

      // Redirect to Midtrans payment page or open snap popup
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (data.token && window.snap) {
        // Use Midtrans Snap popup if available
        window.snap.pay(data.token, {
          onSuccess: () => {
            router.push(`/workspace/${projectId}`);
            router.refresh();
          },
          onPending: () => {
            router.push(`/workspace/${projectId}?payment=pending`);
            router.refresh();
          },
          onError: () => {
            setError('Pembayaran gagal. Silakan coba lagi.');
            setIsLoading(false);
          },
          onClose: () => {
            setIsLoading(false);
          },
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Danai Milestone
          </DialogTitle>
          <DialogDescription>
            Untuk memulai proyek, silakan danai milestone pertama. Dana akan
            disimpan dengan aman di escrow sampai Anda menyetujui hasil kerja.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Milestone Info */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="text-sm text-muted-foreground">Milestone</div>
            <div className="font-medium">{milestoneName}</div>
          </div>

          {/* Amount */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="text-sm text-muted-foreground">Jumlah</div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(milestoneAmount)}
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
            <Shield className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-green-800">Pembayaran Aman</div>
              <div className="text-green-700">
                Dana disimpan di escrow dan hanya dilepas setelah Anda menyetujui
                hasil kerja.
              </div>
            </div>
          </div>

          {/* Payment methods info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CreditCard className="h-4 w-4" />
            <span>Bank Transfer, GoPay, OVO, dan lainnya</span>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Nanti Saja
          </Button>
          <Button onClick={handleFundMilestone} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" />
                Bayar {formatCurrency(milestoneAmount)}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Declare snap type for Midtrans
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        callbacks: {
          onSuccess?: () => void;
          onPending?: () => void;
          onError?: () => void;
          onClose?: () => void;
        }
      ) => void;
    };
  }
}
