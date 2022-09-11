import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./routers/HomePage";


function App() {
  return (
    <>
      <Navbar />
        <HomePage />
      <Footer />
    </>
  )
}

export default App;
