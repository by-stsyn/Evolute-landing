/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { ModelPage } from './pages/ModelPage';
import { CarPage } from './pages/CarPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/models/:modelId" element={<ModelPage />} />
        <Route path="/cars/:carId" element={<CarPage />} />
      </Routes>
    </Layout>
  );
}
