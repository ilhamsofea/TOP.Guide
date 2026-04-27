import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import AssessmentPage from "./pages/AssessmentPage";
import AboutPage from "./pages/AboutPage";
import BulletinPage from "./pages/BulletinPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import FeedbackPage from "./pages/FeedbackPage";

function PageRouter() {
  const { activePage } = useApp();

  const pages = {
    assessment: <AssessmentPage />,
    about: <AboutPage />,
    bulletin: <BulletinPage />,
    resources: <ResourcesPage />,
    contact: <ContactPage />,
    feedback: <FeedbackPage />,
  };

  return pages[activePage] || <AssessmentPage />;
}

function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <PageRouter />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
