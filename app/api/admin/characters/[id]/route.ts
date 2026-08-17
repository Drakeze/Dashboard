import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.status !== 'APPROVED' && body.status !== 'REJECTED') {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  await prisma.character.update({
    where: { id },
    data: { status: body.status },
  });

  return NextResponse.json({ ok: true });
}
