import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_MENUS } from '@/lib/mock-data';

export async function GET() {
  try {
    const menus = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json(INITIAL_MENUS);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { menuId, isAvailable } = body;

    const updated = await prisma.menuItem.update({
      where: { id: menuId },
      data: { isAvailable },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update menu stock' }, { status: 500 });
  }
}
