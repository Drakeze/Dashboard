'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORY_LABELS } from '@/lib/theme';
import { Check, X } from 'lucide-react';
import type { Character as PrismaCharacter } from '@prisma/client';

interface AdminQueueProps {
  submissions: PrismaCharacter[];
}

export function AdminQueue({ submissions }: AdminQueueProps) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: 'APPROVED' | 'REJECTED') {
    setPendingId(id);
    const response = await fetch(`/api/admin/characters/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setPendingId(null);

    if (!response.ok) {
      toast.error('Failed to update submission.');
      return;
    }

    toast.success(status === 'APPROVED' ? 'Character approved.' : 'Character rejected.');
    router.refresh();
  }

  if (submissions.length === 0) {
    return (
      <Card className="p-12 text-center bg-card/50 border-border/30">
        <p className="text-muted-foreground">No pending submissions.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((char) => (
        <Card
          key={char.id}
          className="p-4 bg-card/80 border-border/30 backdrop-blur-sm flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">{char.name}</p>
              <Badge variant="outline" className="text-xs shrink-0">
                {CATEGORY_LABELS[char.category]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{char.bio}</p>
          </div>

          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              disabled={pendingId === char.id}
              onClick={() => updateStatus(char.id, 'REJECTED')}
              className="gap-1"
            >
              <X className="w-4 h-4" />
              Reject
            </Button>
            <Button
              size="sm"
              disabled={pendingId === char.id}
              onClick={() => updateStatus(char.id, 'APPROVED')}
              className="gap-1"
            >
              <Check className="w-4 h-4" />
              Approve
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
