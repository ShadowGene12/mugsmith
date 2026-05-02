import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import QuizPage from "./pages/QuizPage";
import WorkspaceIdentitiesPage from "./pages/WorkspaceIdentitiesPage";
import WorkspaceIdentityDetailPage from "./pages/WorkspaceIdentityDetailPage";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import OTOPage from "./pages/OTOPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import ThankYouPage from "./pages/ThankYouPage";
import AboutPage from "./pages/AboutPage";
import GiftingPage from "./pages/GiftingPage";
import GiftDetailPage from "./pages/GiftDetailPage";
import JournalPage from "./pages/JournalPage";
import JournalPostPage from "./pages/JournalPostPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PolicyPage from "./pages/PolicyPage";
import CommunityPage from "./pages/CommunityPage";
import NotFound from "./pages/NotFound";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <SmoothScroll>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            {/* Primary paths */}
            <Route path="/" element={<Index />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/workspace-identities" element={<WorkspaceIdentitiesPage />} />
            <Route path="/workspace-identities/:slug" element={<WorkspaceIdentityDetailPage />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/gifting" element={<GiftingPage />} />
            <Route path="/gifts/:slug" element={<GiftDetailPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<JournalPostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/policies/:type" element={<PolicyPage />} />
            <Route path="/community" element={<CommunityPage />} />

            {/* Post-purchase (noindex, functional) */}
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/curated-add-on/:slug" element={<OTOPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />

            {/* Legacy redirects */}
            <Route path="/personalities" element={<Navigate to="/workspace-identities" replace />} />
            <Route path="/value-stack" element={<Navigate to="/about" replace />} />
            <Route path="/oto/:slug" element={<Navigate to="/about" replace />} />
            <Route path="/collection/:slug" element={<CollectionPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </SmoothScroll>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
