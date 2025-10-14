const { ObjectId } = require("mongodb");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const dbName = "secoms3190";
const client = new MongoClient(url);
const db = client.db(dbName);

const port = "8080";
const host = "localhost";
app.listen(port, () => {
	console.log("App listening to http://%s:%s", host, port);
});

const getCurrentMaxID = async () => {
	try {
		const response = await fetch("http://localhost:8080/accounts/max-id");
		if (!response.ok) {
			throw new Error("Failed to fetch in getMaxID");
		}
		const data = await response.json();
		return data.maxID;
	} catch (error) {
		console.error("Error in getMaxID", error);
		return 0;
	}
};

app.get("/accounts", async (req, res) => {
	await client.connect();
	console.log("MongoDB client connected for GET Request");
	const query = {};
	const result = await db
		.collection("atlasAccounts")
		.find(query)
		.limit(100)
		.toArray();
	res.status(200);
	res.send(result);
	await client.close();
});

app.get("/accounts/max-id", async (req, res) => {
	try {
		await client.connect();
		console.log("Client connected to get max id");

		const result = await db
			.collection("atlasAccounts")
			.find()
			.sort({ id: -1 })
			.limit(1)
			.toArray();

		const maxID = result.length > 0 ? result[0].id : 0;
		res.status(200).send({ maxID });
	} catch (error) {
		console.log("error fetching maxID");
		res.status(500).send({ message: "Internal server error" });
	} finally {
		await client.close();
	}
});

app.get("/accounts/:id", async (req, res) => {
	try {
		await client.connect();
		console.log("MongoDB client connected for particular GET Request");
		let userID = req.params.id;
		const query = { _id: new ObjectId(userID) };
		const result = await db.collection("atlasAccounts").findOne(query);
		if (result) {
			res.status(200).send(result);
		} else {
			res.status(404).send({ message: "Account not found" });
		}
		res.send(result);
	} catch (error) {
		console.log("Error with GET specific item:", error);
		res.status(500).send({ message: "Internal server error" });
	}
	await client.close();
});
app.post("/", async (req, res) => {
	try {
		await client.connect();
		console.log("MongoDB client connected for POST Request");
		const nextID = (await getCurrentMaxID()) + 1;
		const newUser = {
			_id: nextID,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			savedCart: req.body.savedCart,
		};
		const result = await db.collection("atlasAccounts").insertOne(newUser);
		res.status(200);
		res.send(result);
	} catch (error) {
		console.log("Error inserting new account: ", error.message);
		res.status(500);
	} finally {
		await client.close();
	}
});

app.put("/", async (req, res) => {
	try {
		await client.connect();
		console.log("MongoDB client connected for PUT Request");
		const userID = req.body.id;
		const updatedData = {
			$set: {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				savedCart: req.body.savedCart,
			},
		};
		const result = await db
			.collection("atlasAccounts")
			.findOneAndUpdate({ id: userID }, updatedData, {
				returnDocument: "after",
			});

		if (result.value) {
			res.status(200).send(result.value);
		} else {
			res.status(404).send({ message: "User Not Found" });
		}
	} catch (e) {
		console.log("Error occurred with PUT Req: ", e.message);
		res.status(500).send({ message: "Internal Server Error" });
	} finally {
		await client.close();
	}
});

app.delete("/", async (req, res) => {
	try {
		await client.connect();
		console.log("MongoDB client connected for DELETE Request");
		const userID = req.body.id;
		const result = await db
			.collection("atlasAccounts")
			.findOneAndDelete({ id: userID });

		if (result.value) {
			res.status(200).send(result.value);
		} else {
			res.status(404).send({ message: "User Not Found" });
		}
	} catch (e) {
		console.log("Error occurred with DELETE Req: ", e);
		res.status(500).send({ message: "Internal Server Error" });
	} finally {
		await client.close();
	}
});
