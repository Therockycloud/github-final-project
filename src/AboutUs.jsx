import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <main className="info-page">
      <section className="info-panel">
        <h1>About Paradise Nursery</h1>
        <p>
          Paradise Nursery is an online plant shop focused on helping customers
          create healthier, greener homes. We offer beginner-friendly houseplants,
          decorative foliage, and flowering indoor plants selected for beauty,
          resilience, and easy care.
        </p>
        <p>
          Our team prepares every order with clear care guidance so customers can
          confidently choose the right plant for their lighting, space, and
          lifestyle.
        </p>
        <Link className="secondary-button" to="/plants">
          Browse Plants
        </Link>
      </section>
    </main>
  );
}

export default AboutUs;
