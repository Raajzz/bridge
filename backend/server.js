const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// uncaught exception

process.on("uncaughtException", (err)=>{
	console.log(`Error: ${err.message}`);
	console.log("Shutting down the server due to uncaught exception");
	process.exit(1);
})

// config

dotenv.config({ path: "backend/config/config.env" });

// connecting to the database

connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// some errors with the server, like a server crash

process.on("unhandledRejection", (err)=>{
	console.log(`Error: ${err}`);
	console.log("Shutting down the server due to unhandled Promise Rejection");
	server.close(()=>{
		process.exit(1);
	})
})