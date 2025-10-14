import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import ProductData from "../data/ProductData.json";

const Checkout = ({ loggedIn, gotoAcc, account }) => {
	const [delivery, setDelivery] = React.useState(false);
	const [deliverTo, setDeliverTo] = React.useState("");

	const [cartItems, setCartItems] = React.useState(ProductData.data);
	const [total, setTotal] = React.useState(0);

	useEffect(() => {
		/*pull cart from backend*/
		calcTotal();
	});

	const thisfunc = () => {
		let cartdata = ProductData.data;
		let updatedVal = cartdata.map((item) => ({
			...item,
			quantity: 1,
		}));
		setCartItems(updatedVal);
	};
	const calcTotal = () => {
		let tot = 0;
		for (let product of cartItems) {
			tot += parseFloat(product.price.replace("$", ""));
		}
		setTotal(tot);
	};
	return (
		<>
			<header
				id='header'
				className='w-screen h-16 bg-gray-700 absolute top-0'
			>
				<div
					className='m-auto mr-0 w-fit h-full flex flex-row'
					onClick={gotoAcc}
				>
					<img
						src='/account-head.png'
						className='aspect-square'
					></img>
					<div className='h-fit mt-auto mb-auto'>
						<strong>
							<em>
								{loggedIn
									? account.name === undefined
										? "John Doe"
										: account.name
									: "Log In or Sign Up"}
							</em>
						</strong>
					</div>
				</div>
			</header>
			<div
				className='h-screen flex flex-row bg-gradient-to-r from-blue-700 to-teal-500'
				style={{ paddingTop: "10px" }}
			>
				<Cart
					cartItems={cartItems}
					setCartItems={setCartItems}
					isLoggedIn={loggedIn}
				/>
				<div className='w-1/4 flex flex-col'>
					<div className='bg-white m-auto text-black aspect-square h-1/3 shadow-2xl rounded-2xl'>
						<h3 className='text-2xl font-bold mb-4 p-4 text-gray-800'>
							Delivery Information
						</h3>
						<form className='flex flex-col space-y-2 max-w-2/3 m-auto'>
							<label className='flex items-center space-x-2'>
								<input
									id='delivery_no'
									type='radio'
									name='delivery'
									value='false'
									defaultChecked
									onClick={() => setDelivery(false)}
								/>
								<span>Pickup</span>
							</label>
							<label className='flex items-center space-x-2'>
								<input
									id='delivery_yes'
									type='radio'
									name='delivery'
									value='true'
									onClick={() => {
										setDelivery(true);
										setDeliverTo("close");
									}}
									className='focus:ring-blue-500 border-gray-300 rounded'
								/>
								<span>Delivery</span>
							</label>
						</form>
						<br />
						{delivery ? (
							<>
								<label>Delivery Location:</label>
								<br />
								<select
									className='border-black border-2 p-1 rounded bg-gray-100'
									onChange={(e) => setDeliverTo(e.target.value)}
								>
									<option value='close'>Nearby Location</option>
									<option value='far'>Far Away Location</option>
								</select>
							</>
						) : (
							<>
								<label>Pickup Location:</label>
								<br />
								<select className='border-black border-2 p-1 rounded bg-gray-100'>
									<option value='A'>Location A</option>
									<option value='B'>Location B</option>
								</select>
							</>
						)}
					</div>
					<div className='bg-white m-auto text-black aspect-square h-1/3 shadow-2xl rounded-2xl '>
						<h3 className='text-2xl font-bold mb-4 m-4 text-gray-800'>
							Goto Pay
						</h3>
						<div className='text-justify max-w-2/3 m-auto'>
							Cart Subotal: {total.toFixed(2)}
							<br />
							Tax ({6}%): ${(total * 0.06).toFixed(2)}
							<br />
							{delivery ? (
								<>
									<span>
										Delivery: {deliverTo === "close" ? "$10.00" : "$20.00"}{" "}
									</span>
									<br />
								</>
							) : (
								<></>
							)}
							Total:{" "}
							{(
								total * 1.06 +
								(delivery ? (deliverTo === "close" ? 10 : 20) : 0)
							).toFixed(2)}
						</div>
						<br />
						<button
							type='button'
							className='bg-blue-500 rounded border-black text-white m-4'
						>
							Proceed to Payment&rarr;
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
