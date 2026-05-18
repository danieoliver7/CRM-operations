import { Route, Routes } from 'react-router-dom';
import Analytics from '@/pages/Analytics';
import Calendar from '@/pages/Calendar';
import CampaignDetails from '@/pages/CampaignDetails';
import Campaigns from '@/pages/Campaigns';
import Dashboard from '@/pages/Dashboard';
import KanbanBoard from '@/pages/Kanban';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/kanban" element={<KanbanBoard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/campaign/:id" element={<CampaignDetails />} />
    </Routes>
  );
}
