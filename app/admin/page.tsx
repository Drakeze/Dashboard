import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { AdminQueue } from '@/components/admin-queue';

export default async function AdminPage() {
  await requireAdmin();

  const submissions = await prisma.character.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Pending Submissions
          </h1>
          <p className="text-muted-foreground mt-1">
            {submissions.length} character{submissions.length === 1 ? '' : 's'} awaiting review
          </p>
        </div>

        <AdminQueue submissions={submissions} />
      </main>
    </div>
  );
}
