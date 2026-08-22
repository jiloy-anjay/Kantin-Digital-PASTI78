import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_ORDERS } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json(INITIAL_ORDERS);
    }
    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            menuItem: true,
          },
        },
        user: true,
        stall: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders.length > 0 ? orders : INITIAL_ORDERS);
  } catch (error) {
    return NextResponse.json(INITIAL_ORDERS);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, stallId, items, isPreOrder, pickupTime, paymentMethod, notes, discount } = body;

    const orderCode = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
    const totalPrice = Math.max(0, subtotal - (discount || 0));

    const newOrder = await prisma.order.create({
      data: {
        orderCode,
        userId: userId || 'user-student-1',
        stallId: stallId || 'stan-1',
        totalPrice,
        discount: discount || 0,
        isPreOrder: isPreOrder || false,
        pickupTime: pickupTime || 'Pesan Langsung (Sekarang)',
        paymentMethod: paymentMethod || 'QRIS Kantin Digital',
        notes: notes || null,
        status: 'PENDING',
        orderItems: {
          create: items.map((item: { menuItemId: string; quantity: number; price: number }) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}
