import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { testContractParams, validateEnvironment } from "@/config/environment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/layout/Layout";

// Enhanced Animated Loader for Suspense fallback
const AnimatedLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400" />
      <span className="text-lg font-semibold text-emerald-400">
        Loading ProofPass...
      </span>
    </div>
  </div>
);

// Simplified Route Wrapper
const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={<AnimatedLoader />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Lazy load page components with error handling
const Landing = React.lazy(() => 
  import("./pages/Landing").catch(() => ({ default: () => <div className="p-8 text-center">Error loading Landing page</div> }))
);
const Prove = React.lazy(() => 
  import("./pages/Prove").catch(() => ({ default: () => <div className="p-8 text-center">Error loading Prove page</div> }))
);
const Verify = React.lazy(() => 
  import("./pages/Verify").catch(() => ({ default: () => <div className="p-8 text-center">Error loading Verify page</div> }))
);
const Contracts = React.lazy(() => 
  import("./pages/Contracts").catch(() => ({ default: () => <div className="p-8 text-center">Error loading Contracts page</div> }))
);
const Docs = React.lazy(() => 
  import("./pages/Docs").catch(() => ({ default: () => <div className="p-8 text-center">Error loading Docs page</div> }))
);
const NotFound = React.lazy(() => 
  import("./pages/NotFound").catch(() => ({ default: () => <div className="p-8 text-center">Page not found</div> }))
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Run environment validation on app startup
  useEffect(() => {
    try {
      validateEnvironment();
      testContractParams();
    } catch (error) {
      console.error("Environment validation failed:", error);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          <BrowserRouter>
            <div className="dark min-h-screen flex flex-col bg-background text-foreground">
            <Routes>
              <Route element={<Layout />}>
                {/* Each route wrapped with Suspense and ErrorBoundary */}
                <Route 
                  path="/" 
                  element={
                    <RouteWrapper>
                      <Landing />
                    </RouteWrapper>
                  } 
                />
                <Route 
                  path="/prove" 
                  element={
                    <RouteWrapper>
                      <Prove />
                    </RouteWrapper>
                  } 
                />
                <Route 
                  path="/verify" 
                  element={
                    <RouteWrapper>
                      <Verify />
                    </RouteWrapper>
                  } 
                />
                <Route 
                  path="/contracts" 
                  element={
                    <RouteWrapper>
                      <Contracts />
                    </RouteWrapper>
                  } 
                />
                <Route 
                  path="/docs" 
                  element={
                    <RouteWrapper>
                      <Docs />
                    </RouteWrapper>
                  } 
                />
                <Route 
                  path="*" 
                  element={
                    <RouteWrapper>
                      <NotFound />
                    </RouteWrapper>
                  } 
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
