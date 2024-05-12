import Content from "../components/Content";
import ControlledCarousel from "../components/Carousel";
//import Items from "../components/productList";
import ProductList from "../components/productList";
const Home = () => {
  return (
    <div>
      <Content />
      <ControlledCarousel />
      
      <ProductList />
    </div>
  );
};

export default Home;
