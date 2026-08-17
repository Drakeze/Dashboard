import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { characterSubmissionSchema } from '@/lib/schemas/character-submission';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = characterSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid submission', issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { imageUrl, ...data } = parsed.data;

  const character = await prisma.character.create({
    data: {
      ...data,
      // character-card/detail components fall back to a generic icon for any
      // imageUrl that doesn't start with '/' (an external URL is passed through as-is)
      imageUrl: imageUrl || 'placeholder',
      relationships: [],
      status: 'PENDING',
    },
  });

  return NextResponse.json({ id: character.id }, { status: 201 });
}
