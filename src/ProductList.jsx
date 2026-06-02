import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItem, selectCartCount, selectCartItems } from "./CartSlice.jsx";

export const plantCategories = [
  {
    name: "Low Maintenance",
    plants: [
      {
        id: "snake-plant",
        name: "Snake Plant",
        price: 22,
        image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "zz-plant",
        name: "ZZ Plant",
        price: 26,
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "pothos",
        name: "Golden Pothos",
        price: 18,
        image: "https://images.unsplash.com/photo-1620803366004-119b57f54cd6?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "jade-plant",
        name: "Jade Plant",
        price: 24,
        image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "rubber-plant",
        name: "Rubber Plant",
        price: 34,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "cast-iron-plant",
        name: "Cast Iron Plant",
        price: 28,
        image: "https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Air Purifying",
    plants: [
      {
        id: "peace-lily",
        name: "Peace Lily",
        price: 30,
        image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "boston-fern",
        name: "Boston Fern",
        price: 20,
        image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "spider-plant",
        name: "Spider Plant",
        price: 17,
        image: "https://images.unsplash.com/photo-1601985705806-5b9a71f6004f?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        price: 16,
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c180ef?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "areca-palm",
        name: "Areca Palm",
        price: 42,
        image: "https://images.unsplash.com/photo-1600421682604-36fa8c9fc8f1?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "english-ivy",
        name: "English Ivy",
        price: 21,
        image: "https://images.unsplash.com/photo-1614594075920-2c1648223c70?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    name: "Petite Desk Plants",
    plants: [
      {
        id: "peperomia",
        name: "Peperomia",
        price: 14,
        image: "https://images.unsplash.com/photo-1601985705806-8f56d868c683?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "pilea",
        name: "Pilea",
        price: 19,
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "fittonia",
        name: "Fittonia",
        price: 15,
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "haworthia",
        name: "Haworthia",
        price: 13,
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "calathea-medallion",
        name: "Calathea Medallion",
        price: 25,
        image: "https://images.unsplash.com/photo-1545165375-1b744b9ed444?auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "baby-rubber",
        name: "Baby Rubber Plant",
        price: 18,
        image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];

function Navbar() {
  const cartCount = useSelector(selectCartCount);

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Paradise Nursery
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link className="cart-link" to="/cart" aria-label={`Cart with ${cartCount} items`}>
          <span className="cart-icon">Cart</span>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addedIds = new Set(cartItems.map((item) => item.id));

  return (
    <>
      <Navbar />
      <main className="product-page">
        <header className="page-heading">
          <h1>Shop Houseplants</h1>
          <p>Choose from fresh indoor plants grouped by care style.</p>
        </header>

        {plantCategories.map((category) => (
          <section className="category-section" key={category.name}>
            <h2>{category.name}</h2>
            <div className="product-grid">
              {category.plants.map((plant) => {
                const isAdded = addedIds.has(plant.id);

                return (
                  <article className="product-card" key={plant.id}>
                    <img src={plant.image} alt={plant.name} />
                    <div className="product-details">
                      <h3>{plant.name}</h3>
                      <p>${plant.price.toFixed(2)}</p>
                      <button
                        disabled={isAdded}
                        onClick={() => dispatch(addItem(plant))}
                        type="button"
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export { Navbar };
export default ProductList;
