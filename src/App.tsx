import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary"; // Import ErrorBoundary
import { motion } from "framer-motion";

// Animated Loader for Suspense fallback
const AnimatedLoader = () => (
  <motion.div
    className="flex items-center justify-center min-h-[40vh] w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-400 mr-4" />
    <span className="text-lg font-semibold text-emerald-400">Loading...</span>
  </motion.div>
);

// Lazy load page components
const Landing = React.lazy(() => import("./pages/Landing"));
const Prove = React.lazy(() => import("./pages/Prove"));
const Verify = React.lazy(() => import("./pages/Verify"));
const Contracts = React.lazy(() => import("./pages/Contracts"));
const Docs = React.lazy(() => import("./pages/Docs"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HelmetProvider>
        <ErrorBoundary>
          {" "}
          {/* Wrap BrowserRouter with ErrorBoundary */}
          <BrowserRouter>
            <div className="dark min-h-screen flex flex-col bg-background text-foreground">
              <Routes>
                <Route element={<Layout />}>
                  <Route
                    path="/"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <Landing />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/prove"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <Prove />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/verify"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <Verify />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/contracts"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <Contracts />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/docs"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <Docs />
                      </Suspense>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Suspense fallback={<AnimatedLoader />}>
                        <NotFound />
                      </Suspense>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </ErrorBoundary>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
