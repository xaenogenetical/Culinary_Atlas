import React from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

const Account = ({ logInSwitch, returnToMain }) => {
	const [mode, setMode] = React.useState("login");
	const [account, setAccount] = React.useState({
		name: "DEFAULT",
		pass: "DEFAULT",
	});

	return (
		<>
			<div className='w-full h-full'>
				{mode === "login" && (
					<Login
						switchViews={() => {
							setMode("signup");
						}}
						acc={account}
						setAcc={setAccount}
						logInSwitch={logInSwitch}
						returnToMain={returnToMain}
					/>
				)}
				{mode === "signup" && (
					<Signup
						switchViews={() => {
							setMode("login");
						}}
						acc={account}
						setAcc={setAccount}
					/>
				)}
			</div>
		</>
	);
};

export default Account;
