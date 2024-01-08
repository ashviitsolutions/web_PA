import React from "react";
// import "../../../../Components/Pages/Profile/userProfile/Profile.css";

const Avatar = ({ name }) => {
	const style = {
		backgroundColor: "#f9fcff",
		backgroundImage: "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
		width: 80,
		height: 80,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	const initial = name.slice(0, 1).toUpperCase();
	return (
		<div
			style={{
				display: "flex",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				margin: 10,
			}}
		>
			<div style={style}>
				<p style={{ margin: 0, fontSize: 30 }}>{initial}</p>
			</div>
		</div>
	);
};

export default Avatar;
