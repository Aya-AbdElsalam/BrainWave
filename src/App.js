import { useSelector } from "react-redux";
import Banner from "./component/Banner";
import Header from "./component/Header";
import SliderProducts from "./component/SliderProducts";

function App() {
  const langRedux = useSelector((state) => state.langSlice.lang);

  return (
    <div className="App" dir={langRedux === "Ar" ? "rtl" : "ltr"}>
      <Header />
      <Banner />
      <SliderProducts />
    </div>
  );
}

export default App;
