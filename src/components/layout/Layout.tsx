import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NetworkStatusIndicator from "../NetworkStatusIndicator";
import Footer from "./Footer";
import Header from "./Header";

// Simple loading component
const LayoutLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <div className="flex flex-col items-center space-y-3">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400" />
      <span className="text-sm font-medium text-emerald-400">Loading page...</span>
    </div>
  </div>
);

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NetworkStatusIndicator />
      <Header />
      
      {/* Main content area - no animations, just clean transitions */}
      <main className="flex-1 flex flex-col">
        <Suspense fallback={<LayoutLoader />}>
          <Outlet />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
