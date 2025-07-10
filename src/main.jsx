import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Shop from "./components/shop/shop";
import routes from "./routes/routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
