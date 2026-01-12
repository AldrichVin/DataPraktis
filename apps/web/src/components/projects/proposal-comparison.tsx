'use client';

import { useState } from 'react';
import { Star, Clock, Briefcase, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatCurrency } from '@/lib/utils';

interface Proposal {
  id: string;
  coverLetter: string;
  proposedBudget: number;
  proposedDays: number;
  proposedMilestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate?: string;
  }>;
  status: string;
  createdAt: string;
  analyst: {
    id: string;
    name: string;
    image: string | null;
    analystProfile: {
      headline: string;
      rating: number;
      completedProjects: number;
      responseTimeHours: number | null;
      hourlyRate?: number | null;
    } | null;
  };
}

interface ProposalComparisonProps {
  proposals: Proposal[];
  onAccept: (proposalId: string) => void;
  onReject: (proposalId: string) => void;
  isLoading?: string | null;
  className?: string;
}

export function ProposalComparison({
  proposals,
  onAccept,
  onReject,
  isLoading,
  className,
}: ProposalComparisonProps) {
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const pendingProposals = proposals.filter((p) => p.status === 'PENDING');

  const toggleSelection = (proposalId: string) => {
    setSelectedProposals((prev) =>
      prev.includes(proposalId)
        ? prev.filter((id) => id !== proposalId)
        : prev.length < 3
        ? [...prev, proposalId]
        : prev
    );
  };

  const toggleExpand = (proposalId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(proposalId)) {
        newSet.delete(proposalId);
      } else {
        newSet.add(proposalId);
      }
      return newSet;
    });
  };

  // Find best values for highlighting
  const lowestBudget = Math.min(...pendingProposals.map((p) => p.proposedBudget));
  const shortestTime = Math.min(...pendingProposals.map((p) => p.proposedDays));
  const highestRating = Math.max(
    ...pendingProposals.map((p) => p.analyst.analystProfile?.rating || 0)
  );
  const mostProjects = Math.max(
    ...pendingProposals.map((p) => p.analyst.analystProfile?.completedProjects || 0)
  );

  if (pendingProposals.length === 0) {
    return null;
  }

  const comparisonProposals =
    selectedProposals.length > 0
      ? pendingProposals.filter((p) => selectedProposals.includes(p.id))
      : pendingProposals.slice(0, 3);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Selection Pills */}
      {pendingProposals.length > 3 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground py-1">
            Bandingkan (max 3):
          </span>
          {pendingProposals.map((proposal) => (
            <button
              key={proposal.id}
              onClick={() => toggleSelection(proposal.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-1 rounded-full text-sm border transition-colors',
                selectedProposals.includes(proposal.id)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted border-border'
              )}
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={proposal.analyst.image || ''} />
                <AvatarFallback className="text-xs">
                  {proposal.analyst.name?.[0]}
                </AvatarFallback>
              </Avatar>
              {proposal.analyst.name?.split(' ')[0]}
              {selectedProposals.includes(proposal.id) && (
                <X className="h-3 w-3" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Perbandingan Proposal</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Kriteria</TableHead>
                {comparisonProposals.map((proposal) => (
                  <TableHead key={proposal.id} className="min-w-[200px] text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={proposal.analyst.image || ''} />
                        <AvatarFallback>
                          {proposal.analyst.name?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{proposal.analyst.name}</p>
                        <p className="text-xs text-muted-foreground font-normal">
                          {proposal.analyst.analystProfile?.headline || 'Data Analyst'}
                        </p>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Budget */}
              <TableRow>
                <TableCell className="font-medium">Budget</TableCell>
                {comparisonProposals.map((proposal) => (
                  <TableCell key={proposal.id} className="text-center">
                    <span
                      className={cn(
                        'font-semibold',
                        proposal.proposedBudget === lowestBudget && 'text-green-600'
                      )}
                    >
                      {formatCurrency(proposal.proposedBudget)}
                    </span>
                    {proposal.proposedBudget === lowestBudget && (
                      <Badge variant="success" className="ml-2 text-xs">
                        Terendah
                      </Badge>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Timeline */}
              <TableRow>
                <TableCell className="font-medium">Waktu Pengerjaan</TableCell>
                {comparisonProposals.map((proposal) => (
                  <TableCell key={proposal.id} className="text-center">
                    <span
                      className={cn(
                        proposal.proposedDays === shortestTime && 'text-green-600 font-semibold'
                      )}
                    >
                      {proposal.proposedDays} hari
                    </span>
                    {proposal.proposedDays === shortestTime && (
                      <Badge variant="success" className="ml-2 text-xs">
                        Tercepat
                      </Badge>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Milestones */}
              <TableRow>
                <TableCell className="font-medium">Milestone</TableCell>
                {comparisonProposals.map((proposal) => (
                  <TableCell key={proposal.id} className="text-center">
                    {proposal.proposedMilestones.length} tahap
                  </TableCell>
                ))}
              </TableRow>

              {/* Rating */}
              <TableRow>
                <TableCell className="font-medium">Rating</TableCell>
                {comparisonProposals.map((proposal) => {
                  const rating = proposal.analyst.analystProfile?.rating || 0;
                  return (
                    <TableCell key={proposal.id} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star
                          className={cn(
                            'h-4 w-4',
                            rating > 0
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          )}
                        />
                        <span
                          className={cn(
                            rating === highestRating && rating > 0 && 'text-green-600 font-semibold'
                          )}
                        >
                          {rating > 0 ? rating.toFixed(1) : 'Baru'}
                        </span>
                        {rating === highestRating && rating > 0 && (
                          <Badge variant="success" className="ml-1 text-xs">
                            Top
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Completed Projects */}
              <TableRow>
                <TableCell className="font-medium">Proyek Selesai</TableCell>
                {comparisonProposals.map((proposal) => {
                  const projects = proposal.analyst.analystProfile?.completedProjects || 0;
                  return (
                    <TableCell key={proposal.id} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={cn(
                            projects === mostProjects && projects > 0 && 'text-green-600 font-semibold'
                          )}
                        >
                          {projects}
                        </span>
                        {projects === mostProjects && projects > 0 && (
                          <Badge variant="success" className="ml-1 text-xs">
                            Berpengalaman
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Response Time */}
              <TableRow>
                <TableCell className="font-medium">Waktu Respon</TableCell>
                {comparisonProposals.map((proposal) => {
                  const hours = proposal.analyst.analystProfile?.responseTimeHours;
                  return (
                    <TableCell key={proposal.id} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {hours ? `${hours} jam` : '-'}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>

              {/* Cover Letter Preview */}
              <TableRow>
                <TableCell className="font-medium align-top">Cover Letter</TableCell>
                {comparisonProposals.map((proposal) => (
                  <TableCell key={proposal.id} className="text-left">
                    <p
                      className={cn(
                        'text-sm text-muted-foreground',
                        !expandedRows.has(proposal.id) && 'line-clamp-3'
                      )}
                    >
                      {proposal.coverLetter}
                    </p>
                    {proposal.coverLetter.length > 150 && (
                      <button
                        onClick={() => toggleExpand(proposal.id)}
                        className="text-xs text-primary hover:underline mt-1 flex items-center gap-1"
                      >
                        {expandedRows.has(proposal.id) ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Lebih sedikit
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            Selengkapnya
                          </>
                        )}
                      </button>
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Actions */}
              <TableRow>
                <TableCell className="font-medium">Aksi</TableCell>
                {comparisonProposals.map((proposal) => (
                  <TableCell key={proposal.id} className="text-center">
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => onAccept(proposal.id)}
                        disabled={isLoading === proposal.id}
                      >
                        {isLoading === proposal.id ? (
                          <span className="animate-spin mr-1">...</span>
                        ) : (
                          <Check className="h-4 w-4 mr-1" />
                        )}
                        Terima
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onReject(proposal.id)}
                        disabled={isLoading === proposal.id}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Tolak
                      </Button>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
