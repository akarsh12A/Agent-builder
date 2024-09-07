import React from "react";
import "./App.css";
import CreateAgent from "./CreateAgent/CreateAgent";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import HelpCenter from "./Components/HelpCenter";
import BusinessGoles from "./Components/BusinessGoles";
import Trainingmaterials from "./trainingmaterials/Trainingmaterials";
import UserSettings from "./Components/UserSettings";
import SubscriptionPlans from "./Components/upgrade";
import Conversations from "./Components/Conversations";
import CapturedContacts from "./Components/CapturedContacts";
import TryMyAiAgent from "./Components/trymyaiagent";
import Qualifyleads from "./Components/qualifyleads";
import Advanced from "./Components/advanced";
import Integration from "./Components/integration";
import QandA from "./Components/questionans";
import Appearance from "./appearance/appearancs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CreateAgent />} />{" "}
          {/* Set CreateAgent as the default route */}
          <Route path="/create-agent" element={<CreateAgent />} />
          <Route
            path="*"
            element={
              <>
                <Sidebar />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/Training-Materials"
                    element={<Trainingmaterials />}
                  />
                  <Route path="/upgrade" element={<SubscriptionPlans />} />
                  <Route path="/ai-agent" element={<TryMyAiAgent />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/business-goals" element={<BusinessGoles />} />
                  <Route path="/conversations" element={<Conversations />} />
                  <Route path="/qualify-leads" element={<Qualifyleads />} />
                  <Route path="/advanced" element={<Advanced />} />
                  <Route path="/integrations" element={<Integration />} />
                  <Route path="/questions-answers" element={<QandA />} />
                  <Route path="/appearance" element={<Appearance />} />
                  <Route
                    path="/captured-contacts"
                    element={<CapturedContacts />}
                  />
                  <Route path="/user-settings" element={<UserSettings />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
