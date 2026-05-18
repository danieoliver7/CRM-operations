/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@/app';
import { AppShell } from '@/components/layout';

export default function App() {
  return (
    <Router>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </Router>
  );
}
