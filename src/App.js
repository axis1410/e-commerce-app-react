import Home from "./routes/home/home.component.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import SignIn from "./routes/sign-in/sign-in.component.js";

const Shop = () => {
   return <h1>This is the shop component</h1>;
};

const App = () => {
   const categories = [
      {
         id: 1,
         title: "Hats",
         imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      },
      {
         id: 2,
         title: "Jackets",
         imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      },
      {
         id: 3,
         title: "Sneakers",
         imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      },
      {
         id: 4,
         title: "Womens",
         imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
      },
      {
         id: 5,
         title: "Mens",
         imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
      },
   ];

   return (
      <Routes>
         <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="sign-in" element={<SignIn />} />
         </Route>
      </Routes>
   );
};

export default App;
