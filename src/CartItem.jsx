import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  selectCartItems,
  selectCartTotal,
} from "./CartSlice.jsx";
import { Navbar } from "./ProductList.jsx";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <header className="page-heading">
          <h1>Shopping Cart</h1>
          <p>Total cart amount: ${cartTotal.toFixed(2)}</p>
        </header>

        {cartItems.length === 0 ? (
          <section className="empty-cart">
            <p>Your cart is empty.</p>
            <Link className="secondary-button" to="/plants">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <section className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p>Unit price: ${item.price.toFixed(2)}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      type="button"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => dispatch(removeItem(item.id))}
                    type="button"
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>
              <p>Total: ${cartTotal.toFixed(2)}</p>
              <button onClick={() => alert("Checkout coming soon!")} type="button">
                Checkout - Coming Soon
              </button>
              <Link className="secondary-button" to="/plants">
                Continue Shopping
              </Link>
            </aside>
          </section>
        )}
      </main>
    </>
  );
}

export default CartItem;
