import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_STALLS } from '@/lib/mock-data';

export async function GET() {
  try {
    const stalls = await prisma.stall.findMany({
      include: {
        menuItems: true,
      },
    });
    return NextResponse.json(stalls);
  } catch (error) {
    return NextResponse.json(INITIAL_STALLS);
  }
}
