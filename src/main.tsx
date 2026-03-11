import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import { LocationProvider } from "./contexts/LocationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <LocationProvider>
        <AuthProvider>
          <UserProvider>
            <CartProvider>
              <ProductProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </ProductProvider>
            </CartProvider>
          </UserProvider>
        </AuthProvider>
      </LocationProvider>
    </ThemeProvider>
  </StrictMode>,
);
