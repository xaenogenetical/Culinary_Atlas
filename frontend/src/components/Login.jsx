import React from "react";

const Login = ({ switchViews, logInSwitch, returnToMain, setAcc }) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const fetchAcc = (e) => {
		e.preventDefault();
		console.log(email, password);
		let formdata = new FormData(e.target);
		let email = formdata.get("email");
		const path = "http://localhost:8080/accounts/" + email;
		fetch(path)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch account data.");
				}
				return response.json();
			})
			.then((data) => {
				setAcc(data);
			})
			.catch((error) => {
				console.error("Error: ", error.message);
			});
		logInSwitch();
		returnToMain();
	};

	return (
		<>
			<div className='flex justify-center items-center h-screen text-black bg-gradient-to-r from-blue-900 to-teal-500'>
				<div className='border-2 w-3/4 max-w-md bg-white rounded-3xl flex flex-col p-6 shadow-lg'>
					<h1 className='text-2xl font-bold text-center mb-6'>
						Log in to Your Culinary Atlas&trade; Account
					</h1>
					<form
						onSubmit={fetchAcc}
						className='w-full'
					>
						<label
							htmlFor='email'
							className='block text-gray-700 mb-2'
						>
							E-Mail:
						</label>
						<input
							id='email'
							name='email'
							type='text'
							className='border-2 mb-4 rounded-lg text-center p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='youremail@provider.com'
							minLength={5}
							pattern='[^@]+@[^@]+\.[^@]+'
							onBlur={(e) => setEmail(e.target.value)}
						></input>
						<label
							htmlFor='password'
							className='block text-gray-700 mb-2'
						>
							Password:
						</label>
						<input
							id='password'
							name='password'
							type='password'
							className='border-2 mb-4 rounded-lg text-center p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='password123'
							minLength={3}
							onBlur={(e) => setPassword(e.target.value)}
						></input>
						<button
							type='submit'
							className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full'
						>
							Log in
						</button>
					</form>
					<p className='text-center text-gray-600 mt-4'>
						Need to make an account?{" "}
						<a
							onClick={switchViews}
							className='text-blue-500 hover:underline cursor-pointer'
						>
							Sign up.
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
