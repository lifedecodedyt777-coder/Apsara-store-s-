import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { BestSellers } from "@/components/BestSellers";
import { Concerns } from "@/components/Concerns";
import { WhyUs } from "@/components/WhyUs";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Offers } from "@/components/Offers";
import { Contact } from "@/components/Contact";
import AnnouncementBar from "@/components/AnnouncementBar";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { AdminLoginPage } from "@/pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import { BeforeAfterAdminPage } from './pages/admin/BeforeAfterAdminPage';

// Initialize auth token getter from localStorage on app load
setAuthTokenGetter(() => localStorage.getItem("admin_token"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      retry: 1,
    },
  },
});

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-accent/30">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Categories />
        <BestSellers />
        <Concerns />
        <BeforeAfterSection />
        <Offers />
        <WhyUs />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function AdminRoute() {
  const token = localStorage.getItem("admin_token");
  return token ? <Redirect to="/admin/dashboard" /> : <AdminLoginPage />;
}

function ProtectedAdminDashboard() {
  const token = localStorage.getItem("admin_token");
  return token ? <AdminDashboardPage /> : <Redirect to="/admin" />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/products/:id" component={ProductDetailPage} />
      <Route path="/admin" component={AdminRoute} />
      <Route path="/admin/dashboard" component={ProtectedAdminDashboard} />
        <Route path="/admin/results" component={BeforeAfterAdminPage}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

