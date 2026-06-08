import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to run Prisma seed.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
});

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: 'default-organization' },
    update: {},
    create: {
      name: 'Default Organization',
      slug: 'default-organization',
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'default-workspace' },
    update: {},
    create: {
      name: 'Default Workspace',
      slug: 'default-workspace',
      organizationId: organization.id,
    },
  });

  await prisma.user.upsert({
    where: { email: 'daniel.oliveira@example.local' },
    update: {},
    create: {
      name: 'Daniel Oliveira',
      email: 'daniel.oliveira@example.local',
      roleLabel: 'CRM Operations Lead',
    },
  });

  await prisma.user.upsert({
    where: { email: 'marina.lopes@example.local' },
    update: {},
    create: {
      name: 'Marina Lopes',
      email: 'marina.lopes@example.local',
      roleLabel: 'CRM QA Owner',
    },
  });

  await prisma.squad.upsert({
    where: {
      workspaceId_name: {
        workspaceId: workspace.id,
        name: 'CRM Lifecycle',
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'CRM Lifecycle',
      description: 'Lifecycle campaign operations squad.',
    },
  });

  await prisma.squad.upsert({
    where: {
      workspaceId_name: {
        workspaceId: workspace.id,
        name: 'Marketing Automation',
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'Marketing Automation',
      description: 'Automation and implementation squad.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
