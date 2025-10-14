import React from "react";

const About = ({ cart, setCart, setStep }) => {
  
  
  const [products, setProducts] = useState([]);
  useEffect(() => {
  getProducts();
  }, []);
  function getProducts() {
  fetch("http://127.0.0.1:8080/products")
  .then((response) => response.json())
  .then((data) => {
  setProducts(data);
  })
  .catch((error) => {
  console.error("Error fetching Products:", error);
  });
  }
  return (
    <>
      <div className="bg-gray-300 h-full">
        {/* Add appropriate Tailwind styling 👇 */}
        <header className="flex justify-center flex-wrap w-full bg-gray-500 text-[100px]">
          About US
        </header>
        <br />
        <div className="flex flex-wrap justify-center">
            <h1>Our Course</h1>
            <p>SE/COM S 3190 – Construction of User Interfaces, Spring 2025</p>
            <br />
            <h1>Authors:</h1>
            <h2>Dawson Glawe:</h2>
            <p>NetID: glawe29@iastate.edu</p>
            <br />
            <h2>Dylan Krahenbuhl:</h2>
            <p>NetID: dakrah@iastate.edu</p>
          <br />
        </div>
        <div>
          <div className="flex m-auto justify-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
              onClick={() => setStep("products")}
            >
              Go to Products
            </button>

          </div>
          <br />
        </div>
        <footer className="absolute left-0 w-full bg-gray-500 text-center">
        Created by Dawson Glawe
      </footer>
      </div>
      
    </>
  );
};

export default About;
