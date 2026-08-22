import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_STALLS } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json(INITIAL_STALLS);
    }
    const stalls = await prisma.stall.findMany({
      include: {
        menuItems: true,
      },
    });
    return NextResponse.json(stalls.length > 0 ? stalls : INITIAL_STALLS);
  } catch (error) {
    return NextResponse.json(INITIAL_STALLS);
  }
}
