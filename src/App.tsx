import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./pages/Landing";
import Prove from "./pages/Prove";
import Verify from "./pages/Verify";
import Contracts from "./pages/Contracts";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/prove" element={<Prove />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
