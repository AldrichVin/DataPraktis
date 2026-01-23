'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateQuestion {
  id: string;
  type: 'select' | 'multiselect' | 'text' | 'textarea';
  label: string;
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
  placeholder?: string;
}

interface TemplateAnswersDisplayProps {
  templateName: string;
  templateQuestions: TemplateQuestion[];
  answers: Record<string, unknown>;
  defaultExpanded?: boolean;
  className?: string;
}

export function TemplateAnswersDisplay({
  templateName,
  templateQuestions,
  answers,
  defaultExpanded = false,
  className,
}: TemplateAnswersDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const formatAnswer = (question: TemplateQuestion, answer: unknown): string => {
    if (answer === null || answer === undefined || answer === '') {
      return '-';
    }

    switch (question.type) {
      case 'select': {
        const option = question.options?.find((opt) => opt.value === answer);
        return option?.label || String(answer);
      }
      case 'multiselect': {
        if (Array.isArray(answer)) {
          return answer
            .map((val) => {
              const option = question.options?.find((opt) => opt.value === val);
              return option?.label || val;
            })
            .join(', ');
        }
        return String(answer);
      }
      case 'text':
      case 'textarea':
      default:
        return String(answer);
    }
  };

  const answeredQuestions = templateQuestions.filter(
    (q) => answers[q.id] !== null && answers[q.id] !== undefined && answers[q.id] !== ''
  );

  if (answeredQuestions.length === 0) {
    return null;
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="h-5 w-5 text-primary" />
            Detail Kebutuhan
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Tutup
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Lihat ({answeredQuestions.length})
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Jawaban dari template: {templateName}
        </p>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {answeredQuestions.map((question) => {
              const answer = answers[question.id];
              const formattedAnswer = formatAnswer(question, answer);

              return (
                <div key={question.id} className="border-b pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {question.label}
                  </p>
                  {question.type === 'multiselect' && Array.isArray(answer) ? (
                    <div className="flex flex-wrap gap-1.5">
                      {answer.map((val, idx) => {
                        const option = question.options?.find((opt) => opt.value === val);
                        return (
                          <Badge key={idx} variant="secondary">
                            {option?.label || val}
                          </Badge>
                        );
                      })}
                    </div>
                  ) : question.type === 'textarea' ? (
                    <p className="text-sm whitespace-pre-wrap">{formattedAnswer}</p>
                  ) : question.type === 'select' ? (
                    <Badge variant="outline">{formattedAnswer}</Badge>
                  ) : (
                    <p className="text-sm">{formattedAnswer}</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
