import { PrismaClient } from '@prisma/client';
import { INITIAL_USERS, INITIAL_STALLS, INITIAL_MENUS, INITIAL_ORDERS } from '../lib/mock-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Kantin Digital PASTI78 database...');

  // Clean existing tables
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.menuItem.deleteMany({});
  await prisma.stall.deleteMany({});
  await prisma.user.deleteMany({});

  // 1. Seed Users
  for (const user of INITIAL_USERS) {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: 'password123',
        role: user.role,
        nisn: user.nisn || null,
        balance: user.balance,
        avatar: user.avatar,
      },
    });
  }
  console.log('✅ Users seeded');

  // 2. Seed Stalls
  for (const stall of INITIAL_STALLS) {
    await prisma.stall.create({
      data: {
        id: stall.id,
        name: stall.name,
        description: stall.description,
        sellerId: stall.sellerId,
        rating: stall.rating,
        openTime: stall.openTime,
        image: stall.image,
      },
    });
  }
  console.log('✅ Stalls seeded');

  // 3. Seed Menu Items
  for (const menu of INITIAL_MENUS) {
    await prisma.menuItem.create({
      data: {
        id: menu.id,
        stallId: menu.stallId,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        originalPrice: menu.originalPrice || null,
        category: menu.category,
        isAvailable: menu.isAvailable,
        isBestSeller: menu.isBestSeller || false,
        image: menu.image,
      },
    });
  }
  console.log('✅ Menu items seeded');

  // 4. Seed Sample Orders
  for (const order of INITIAL_ORDERS) {
    await prisma.order.create({
      data: {
        id: order.id,
        orderCode: order.orderCode,
        userId: order.userId,
        stallId: order.stallId,
        totalPrice: order.totalPrice,
        discount: order.discount || 0,
        isPreOrder: order.isPreOrder,
        pickupTime: order.pickupTime,
        paymentMethod: order.paymentMethod,
        notes: order.notes,
        status: order.status,
        orderItems: {
          create: order.items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }
  console.log('✅ Orders seeded');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
