import React from "react";

const Cart = ({ cartItems, setCartItems, isLoggedIn, logInOut }) => {
	const cartSize = () => cartItems.length;

	const handleCartChange = () => {
		if (isLoggedIn) {
			console.log("Backend Req");
		}
		/* Run to backend to update the cart, so that carts are saved between sessions */
	};

	const handleRemoveItem = (itemId) => {
		setCartItems(cartItems.filter((item) => item.name !== itemId));
		handleCartChange();
	};

	const handleClearCart = () => {
		setCartItems([]);
		handleCartChange();
	};

	return (
		<>
			<div className='h-full w-3/4 flex'>
				<div className='cart h-3/4 w-3/4 m-auto bg-gray-100 p-6 rounded-lg shadow-2xl overflow-y-auto'>
					<h2 className='cart-title text-2xl font-bold mb-4 text-gray-800'>
						Your Cart ({cartSize()})
					</h2>
					{cartItems.length === 0 ? (
						<p className='cart-empty text-gray-500'>Your cart is empty.</p>
					) : (
						<ul className='cart-items space-y-4 m-2'>
							{cartItems.map((item) => (
								<li
									key={item.id}
									className='cart-item flex justify-between items-center bg-white p-4 rounded-lg shadow-sm'
								>
									<img
										src={item.src}
										alt={item.alt}
										className='w-20 h-20 object-cover'
									></img>
									<div>
										<span className='item-name text-gray-700 font-medium'>
											{item.name}
										</span>
										<br />
										<span className='item-price text-gray-600'>
											{item.price} x {item.quantity}
										</span>
									</div>
									<button
										className='remove-button ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
										onClick={() => handleRemoveItem(item.name)}
									>
										Remove &times;
									</button>
								</li>
							))}
						</ul>
					)}
					{cartItems.length > 0 && (
						<button
							className='clear-cart-button bg-blue-500 text-white w-fit py-2 rounded hover:bg-blue-600'
							onClick={handleClearCart}
						>
							Clear Cart
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Cart;
