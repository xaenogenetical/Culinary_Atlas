import React from "react";

const Home = ({ cart, setCart, setStep }) => {
  // TODO:
  // - Display list of courses (use props or mock data)
  // - Add search input fields (extra credit)
  // - Add "Add to Cart" button for each course
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
          Browse Courses
        </header>
        <br />
        <div className="flex flex-wrap justify-center">
          <br />
        </div>
        <div>
          <div className="flex m-auto justify-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
              onClick={() => setStep("home")}
            >
              Go to Cart
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

export default Home;
