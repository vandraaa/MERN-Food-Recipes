import Footer from "../../../layout/Footer";
import Navbar from "../../../layout/Navbar";
import BecomeAuthor from "./components/BecomeAuthor";
import CustomerReviews from "./components/CustomerReviews";
import HomeContent from "./components/HomeContent";
import TrendingRecipe from "./components/TrendingRecipe";

export default function HomePage() {
  return (
    <div className="bg-slate-100">
      <Navbar />
      <HomeContent />
      <TrendingRecipe />
      <CustomerReviews />
      <BecomeAuthor />
      <Footer />
    </div>
  );
}