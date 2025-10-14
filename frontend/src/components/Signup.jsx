import React from "react";

const Signup = ({ switchViews }) => {
	const [email, setEmail] = React.useState("");
	const [userName, setUserName] = React.useState("");
	const [password, setPassword] = React.useState("");

	const createAccount = (e) => {
		e.preventDefault();
		console.log(userName, email, password);
		let creator = new FormData(e.target);
		const newUser = {
			name: creator.get("fullname"),
			email: creator.get("email"),
			password: creator.get("password"),
			savedCart: [],
		};
		fetch("http://localhost:8080/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		switchViews();
	};

	return (
		<>
			<div className='flex justify-center items-center h-screen text-black bg-gradient-to-r from-blue-900 to-teal-500'>
				<div className='border-2 w-3/4 max-w-md bg-white rounded-3xl flex flex-col p-6 shadow-lg'>
					<h1 className='text-2xl font-bold text-center mb-6'>
						Create a Culinary Atlas&trade; Account
					</h1>
					<form
						onSubmit={createAccount}
						className='w-full'
					>
						<label
							htmlFor='fullname'
							className='block text-gray-700 mb-2'
						>
							Name:
						</label>
						<input
							id='fullname'
							name='fullname'
							type='text'
							className='border-2 mb-4 rounded-lg text-center p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='John Doe'
							onBlur={(e) => setUserName(e.target.value)}
						></input>
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
							onBlur={(e) => setPassword(e.target.value)}
						></input>
						<button
							type='submit'
							className='bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full'
						>
							Sign Up
						</button>
					</form>
					<p className='text-center text-gray-600 mt-4'>
						Already have an account?{" "}
						<a
							onClick={switchViews}
							className='text-blue-500 hover:underline cursor-pointer'
						>
							Log in instead.
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Signup;
