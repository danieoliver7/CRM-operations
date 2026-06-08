-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('briefing', 'copy', 'approval', 'development', 'qa', 'scheduled', 'sent', 'completed');

-- CreateEnum
CREATE TYPE "CampaignChannel" AS ENUM ('email', 'push', 'sms', 'whatsapp', 'web_push', 'in_app');

-- CreateEnum
CREATE TYPE "CampaignPriority" AS ENUM ('low', 'medium', 'high', 'urgent');

-- CreateEnum
CREATE TYPE "CampaignComplexity" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "CampaignActivityType" AS ENUM ('campaign_created', 'status_changed', 'priority_changed', 'owner_changed', 'blocker_created', 'blocker_resolved', 'handoff_started', 'handoff_completed', 'note_added', 'decision_recorded', 'risk_note_added', 'resolution_note_added', 'handoff_note_added', 'due_date_changed', 'execution_risk_detected', 'sla_due_soon', 'campaign_overdue', 'workflow_stalled');

-- CreateEnum
CREATE TYPE "CampaignActivityCategory" AS ENUM ('workflow', 'coordination', 'execution', 'planning', 'collaboration');

-- CreateEnum
CREATE TYPE "BlockerSeverity" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "BlockerStatus" AS ENUM ('open', 'resolved');

-- CreateEnum
CREATE TYPE "HandoffStatus" AS ENUM ('pending', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "CampaignNoteType" AS ENUM ('note', 'decision', 'rationale', 'clarification', 'risk_note', 'resolution_note', 'handoff_note');

-- CreateEnum
CREATE TYPE "CampaignNoteImportance" AS ENUM ('low', 'normal', 'high');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "avatarUrl" TEXT,
    "roleLabel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Squad" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Squad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "ownerId" TEXT,
    "squadId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "objective" TEXT,
    "status" "CampaignStatus" NOT NULL,
    "channel" "CampaignChannel" NOT NULL,
    "priority" "CampaignPriority" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "plannedDate" TIMESTAMP(3),
    "campaignType" TEXT,
    "audience" TEXT,
    "segmentation" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "content" JSONB,
    "metricsTarget" JSONB,
    "estimatedComplexity" "CampaignComplexity",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignActivity" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "actorUserId" TEXT,
    "type" "CampaignActivityType" NOT NULL,
    "category" "CampaignActivityCategory",
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocker" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "severity" "BlockerSeverity" NOT NULL,
    "status" "BlockerStatus" NOT NULL DEFAULT 'open',
    "createdByUserId" TEXT,
    "resolvedByUserId" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Handoff" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "fromStage" "CampaignStatus",
    "toStage" "CampaignStatus",
    "fromOwnerId" TEXT,
    "toOwnerId" TEXT,
    "fromSquadId" TEXT,
    "toSquadId" TEXT,
    "status" "HandoffStatus" NOT NULL,
    "reason" TEXT,
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Handoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignNote" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "authorUserId" TEXT,
    "type" "CampaignNoteType" NOT NULL DEFAULT 'note',
    "title" TEXT,
    "content" TEXT NOT NULL,
    "relatedWorkflowStage" "CampaignStatus",
    "relatedBlockerId" TEXT,
    "relatedHandoffId" TEXT,
    "relatedActivityId" TEXT,
    "importance" "CampaignNoteImportance" NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecisionContext" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "authorUserId" TEXT,
    "type" "CampaignNoteType" NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "relatedWorkflowStage" "CampaignStatus",
    "relatedBlockerId" TEXT,
    "relatedHandoffId" TEXT,
    "relatedActivityId" TEXT,
    "importance" "CampaignNoteImportance" NOT NULL DEFAULT 'normal',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DecisionContext_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE INDEX "Workspace_organizationId_idx" ON "Workspace"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Squad_workspaceId_idx" ON "Squad"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Squad_workspaceId_name_key" ON "Squad"("workspaceId", "name");

-- CreateIndex
CREATE INDEX "Campaign_workspaceId_idx" ON "Campaign"("workspaceId");

-- CreateIndex
CREATE INDEX "Campaign_ownerId_idx" ON "Campaign"("ownerId");

-- CreateIndex
CREATE INDEX "Campaign_squadId_idx" ON "Campaign"("squadId");

-- CreateIndex
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- CreateIndex
CREATE INDEX "Campaign_priority_idx" ON "Campaign"("priority");

-- CreateIndex
CREATE INDEX "Campaign_dueDate_idx" ON "Campaign"("dueDate");

-- CreateIndex
CREATE INDEX "CampaignActivity_campaignId_idx" ON "CampaignActivity"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignActivity_actorUserId_idx" ON "CampaignActivity"("actorUserId");

-- CreateIndex
CREATE INDEX "CampaignActivity_type_idx" ON "CampaignActivity"("type");

-- CreateIndex
CREATE INDEX "CampaignActivity_createdAt_idx" ON "CampaignActivity"("createdAt");

-- CreateIndex
CREATE INDEX "Blocker_campaignId_idx" ON "Blocker"("campaignId");

-- CreateIndex
CREATE INDEX "Blocker_status_idx" ON "Blocker"("status");

-- CreateIndex
CREATE INDEX "Blocker_severity_idx" ON "Blocker"("severity");

-- CreateIndex
CREATE INDEX "Handoff_campaignId_idx" ON "Handoff"("campaignId");

-- CreateIndex
CREATE INDEX "Handoff_status_idx" ON "Handoff"("status");

-- CreateIndex
CREATE INDEX "CampaignNote_campaignId_idx" ON "CampaignNote"("campaignId");

-- CreateIndex
CREATE INDEX "CampaignNote_authorUserId_idx" ON "CampaignNote"("authorUserId");

-- CreateIndex
CREATE INDEX "CampaignNote_type_idx" ON "CampaignNote"("type");

-- CreateIndex
CREATE INDEX "DecisionContext_campaignId_idx" ON "DecisionContext"("campaignId");

-- CreateIndex
CREATE INDEX "DecisionContext_authorUserId_idx" ON "DecisionContext"("authorUserId");

-- CreateIndex
CREATE INDEX "DecisionContext_type_idx" ON "DecisionContext"("type");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Squad" ADD CONSTRAINT "Squad_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_squadId_fkey" FOREIGN KEY ("squadId") REFERENCES "Squad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignActivity" ADD CONSTRAINT "CampaignActivity_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocker" ADD CONSTRAINT "Blocker_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocker" ADD CONSTRAINT "Blocker_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocker" ADD CONSTRAINT "Blocker_resolvedByUserId_fkey" FOREIGN KEY ("resolvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handoff" ADD CONSTRAINT "Handoff_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handoff" ADD CONSTRAINT "Handoff_fromOwnerId_fkey" FOREIGN KEY ("fromOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handoff" ADD CONSTRAINT "Handoff_toOwnerId_fkey" FOREIGN KEY ("toOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handoff" ADD CONSTRAINT "Handoff_fromSquadId_fkey" FOREIGN KEY ("fromSquadId") REFERENCES "Squad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Handoff" ADD CONSTRAINT "Handoff_toSquadId_fkey" FOREIGN KEY ("toSquadId") REFERENCES "Squad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignNote" ADD CONSTRAINT "CampaignNote_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignNote" ADD CONSTRAINT "CampaignNote_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionContext" ADD CONSTRAINT "DecisionContext_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecisionContext" ADD CONSTRAINT "DecisionContext_authorUserId_fkey" FOREIGN KEY ("authorUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
