import { useParams, useOutletContext } from "react-router-dom";

const Item = () => {
  const id = location.pathname.replace(/^\D+/g, "");
  const [
    data,
    error,
    loading,
    cartItems,
    setCartItems,
    renderButtons,
    isItemInCart,
    handleAdd,
    handleRemove,
  ] = useOutletContext();

  const product = data[id];
  const inCart = isItemInCart(product.id);

  return (
    <div>
      <h1>{product.title}</h1>
      <h3>{product.description}</h3>
      <img src={product.image}></img>
      <p>
        <strong>Price: </strong>
        {product.price.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
        })}
      </p>
      <p>
        <strong>Rating: </strong>
        {product.rating.rate} ({product.rating.count})
      </p>
      <p></p>
      {renderButtons(inCart, product)}
    </div>
  );
};

export default Item;
