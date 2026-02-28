import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ScrollToTop } from "./components/common/ScrollToTop";

// Páginas públicas
import { Home } from "./pages/Public/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { ResetPassword } from "./pages/Auth/ResetPassword";
import ProductDetail from "./components/common/ProductDetail";
import Products from "./pages/Public/Products";
import { AllProducts } from "./pages/Public/Products";
import { SearchResults } from "./pages/Public/SearchResults";
import { About } from "./pages/Public/AboutUs";
import { Help } from "./pages/Public/Help";
import SellerInfo from "./pages/Public/SellerInfo";
import { LegalPage } from "./pages/Public/Legals";
import ComingSoonPage from "./pages/Public/404";

// Páginas comprador
import Cart from "./pages/Buyer/Cart";
import { Checkout } from "./pages/Buyer/Checkout";
import { OrderConfirmation } from "./pages/Buyer/OrderConfirmation";
import OrderHistory from "./pages/Buyer/OrderHistory";
import OrderDetail from "./pages/Buyer/OrderDetail";

// Páginas vendedor
import SellerDashboard from "./pages/Seller/SellerDashboard";
import ProductManagement from "./pages/Seller/ProductManagement";
import ProductForm from "./pages/Seller/ProductForm";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { Layout } from "./layout";
import { UserProfile } from "./pages/Profile/UserProfile";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Products />} />
                <Route
                  path="/products/category/:categorySlug"
                  element={<AllProducts />}
                />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<Help />} />
                <Route path="/sellerInfo" element={<SellerInfo />} />
                <Route path="/legal" element={<LegalPage />} />
                <Route path="/404" element={<ComingSoonPage />} />

                {/* Ruata Perfil Usuario */}
                <Route
                  path="/user/profile"
                  element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas Comprador */}
                <Route path="/cart" element={<Cart />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-confirmation/:id"
                  element={<OrderConfirmation />}
                />
                <Route
                  path="/buyer/orders"
                  element={
                    <ProtectedRoute allowedRole="buyer">
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/buyer/orders/:id"
                  element={
                    <ProtectedRoute allowedRole="buyer">
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas vendedor */}
                <Route
                  path="/seller/dashboard"
                  element={
                    <ProtectedRoute allowedRole="seller">
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seller/products"
                  element={
                    <ProtectedRoute allowedRole="seller">
                      <ProductManagement />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seller/products/new"
                  element={
                    <ProtectedRoute allowedRole="seller">
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seller/products/edit/:id"
                  element={
                    <ProtectedRoute allowedRole="seller">
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/seller/orders"
                  element={
                    <ProtectedRoute allowedRole="seller">
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />

                {/* Cachear todos - redirección al inicio */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
    </Router>
  );
}

export default App;
