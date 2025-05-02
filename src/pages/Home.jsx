import { About } from "../components/Home/About/About";
import HeroCarousel from "../components/Home/hero_caurosal/hero_caurosal";
import { Updates } from "../components/Home/Updates/Updates";
import { PR } from "../components/Home/Pridewall&Roadmap/PR";

const Home = () => {
  
    return (
      <>
      <HeroCarousel/>
      <About/>
      <PR/>
      </>
    );
  };
  
  export default Home; 
  