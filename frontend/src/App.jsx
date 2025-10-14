import React from "react";
import "./App.css";
import Account from "./components/Account.jsx";
import Checkout from "./components/Checkout.jsx";
import Home from "./components/Home.jsx";
import Products from "./components/Products.jsx"
import About from "./components/About.jsx"
import Suggestions from "./components/Suggestions.jsx";

function App() {
	//TODO: FIX THIS. IT IS ONLY LIKE THIS FOR TESTING

	const [loggedIn, changeLoginStatus] = React.useState(false);
	const [account, setAccount] = React.useState({});
	const [page, setPage] = React.useState("products");
	const [cart, setCart] = React.useState({});
	const fetchCartFromBackend = (acct) => {
		/* get data from backend */
		console.log("Backend get for acct: ", acct);
		setCart(/*data fetched*/);
	};

	

	return (
		<>
			{(page === "about" && <About setPage={setPage} />)}
				{(page === "account" && (
					<Account
						setPage={setPage}
						setAccount={setAccount}
						changeLoginStatus={changeLoginStatus}
					/>
<<<<<<< Updated upstream
				))}
				{(page === "checkout" && <Checkout setPage={setPage} />)}
				{(page === "home" && <Home setPage={setPage} />)}
				{(page === "products" && <Products setPage={setPage} setCart={setCart}/>)}
				{(page === "suggestions" && <Suggestions setPage={setPage}/>)}
=======
				),
				page === "checkout" && (
					<Checkout
						setPage={setPage}
						cart={cart}
						setCart={setCart}
					/>
				),
				page === "home" && <Home setPage={setPage} />,
				page === "products" && <Products setPage={setPage} />)
			}
>>>>>>> Stashed changes
		</>
	);
}

export default App;
