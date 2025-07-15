import Shop from "../components/shop/shop";
import Home from "../components/home/home";
import Index from "../components/index";
import Cart from "../components/shop/cart";
import ErrorPage from "../components/error/Errorpage";

const routes = [
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
