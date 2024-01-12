import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Make sure this import is correct
import store from "./Components/Pages/Redux/store";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
				<ToastContainer />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
