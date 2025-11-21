
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './components/content/Landing';
import { Abstract } from './components/content/Abstract';
import { Introduction } from './components/content/Introduction';
import { CurrentState } from './components/content/challenges/CurrentState';
import { PhysicalBarriers } from './components/content/challenges/PhysicalBarriers';
import { EntanglementSolution } from './components/content/EntanglementSolution';
import { Motivation } from './components/content/background/Motivation';
import { EntanglementSwapping } from './components/content/background/EntanglementSwapping';
import { FidelityDecoherence } from './components/content/background/FidelityDecoherence';
import { NodeArchitecture } from './components/content/background/NodeArchitecture';
import { UseCases } from './components/content/protocol/UseCases';
import { ServiceDelivered } from './components/content/protocol/ServiceDelivered';
import { NetworkLayerArchitecture } from './components/content/protocol/NetworkLayerArchitecture';
import { QuantumDataPlane } from './components/content/protocol/QuantumDataPlane';
import { LinkLayerService } from './components/content/protocol/LinkLayerService';
import { ProtocolDesign } from './components/content/protocol/ProtocolDesign';
import { SwapTracking } from './components/content/protocol/SwapTracking';
import { ErrorTimeManagement } from './components/content/protocol/ErrorTimeManagement';
import { TrafficOptimization } from './components/content/protocol/TrafficOptimization';
import { ProtocolDetails } from './components/content/protocol/ProtocolDetails';
import { ExampleSequence } from './components/content/protocol/ExampleSequence';
import { EntanglementDistillation } from './components/content/protocol/EntanglementDistillation';
import { EvaluationSetup } from './components/content/evaluation/EvaluationSetup';
import { ThroughputLatency } from './components/content/evaluation/ThroughputLatency';
import { DecoherenceRobustness } from './components/content/evaluation/DecoherenceRobustness';
import { NearFuturePerformance } from './components/content/evaluation/NearFuturePerformance';
import { Discussion } from './components/content/Discussion';
import { RelatedWork } from './components/content/RelatedWork';
import { Conclusions } from './components/content/Conclusions';

// In the future, we can use a dynamic map, but for now, explicit routes are safer for Type Safety.

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default redirect to Landing */}
          <Route path="/" element={<Landing />} />
          <Route path="/cover" element={<Landing />} />
          
          {/* Content Routes */}
          <Route path="/abstract" element={<Abstract />} />
          
          {/* Introduction Section Routes */}
          <Route path="/introduction" element={<Navigate to="/introduction/overview" replace />} />
          <Route path="/introduction/overview" element={<Introduction />} />
          <Route path="/introduction/current-state" element={<CurrentState />} />
          <Route path="/introduction/physical-barriers" element={<PhysicalBarriers />} />
          <Route path="/introduction/entanglement-solution" element={<EntanglementSolution />} />
          
          {/* Background Section Routes */}
          <Route path="/background" element={<Navigate to="/background/motivation" replace />} />
          <Route path="/background/motivation" element={<Motivation />} />
          <Route path="/background/entanglement-swapping" element={<EntanglementSwapping />} />
          <Route path="/background/fidelity-decoherence" element={<FidelityDecoherence />} />
          <Route path="/background/node-architecture" element={<NodeArchitecture />} />
          
          {/* Protocol Section Routes */}
          <Route path="/protocol" element={<Navigate to="/protocol/use-cases" replace />} />
          <Route path="/protocol/use-cases" element={<UseCases />} />
          <Route path="/protocol/service-delivered" element={<ServiceDelivered />} />
          <Route path="/protocol/network-layer-architecture" element={<NetworkLayerArchitecture />} />
          <Route path="/protocol/quantum-data-plane" element={<QuantumDataPlane />} />
          <Route path="/protocol/link-layer-service" element={<LinkLayerService />} />
          
          {/* Design Section Routes */}
          <Route path="/design" element={<Navigate to="/design/protocol-design" replace />} />
          <Route path="/design/protocol-design" element={<ProtocolDesign />} />
          <Route path="/design/swap-tracking" element={<SwapTracking />} />
          <Route path="/design/error-time-management" element={<ErrorTimeManagement />} />
          <Route path="/design/traffic-optimization" element={<TrafficOptimization />} />
          <Route path="/design/protocol-details" element={<ProtocolDetails />} />
          <Route path="/design/example-sequence" element={<ExampleSequence />} />
          <Route path="/design/entanglement-distillation" element={<EntanglementDistillation />} />
          
          {/* Evaluation Section Routes */}
          <Route path="/evaluation" element={<Navigate to="/evaluation/setup" replace />} />
          <Route path="/evaluation/setup" element={<EvaluationSetup />} />
          <Route path="/evaluation/throughput-latency" element={<ThroughputLatency />} />
          <Route path="/evaluation/decoherence" element={<DecoherenceRobustness />} />
          <Route path="/evaluation/near-future" element={<NearFuturePerformance />} />
          
          {/* New Sections */}
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/related-work" element={<RelatedWork />} />
          <Route path="/conclusions" element={<Conclusions />} />
          
          {/* Fallback for 404 */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-400">صفحه مورد نظر یافت نشد</h2>
              <p className="text-slate-500 mt-2">لطفا از منوی سمت راست انتخاب کنید.</p>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
