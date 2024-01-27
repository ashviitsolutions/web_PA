
import React from "react";
// import "../../../../Components/Pages/Profile/userProfile/Profile.css";
import avbg from "../../../img/user2.png"

const Avatar = ({ name }) => {
	const style = {
		backgroundColor: "#f9fcff",
		background: "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
		width: 80,
		height: 80,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	// const initial = name.slice(0, 1).toUpperCase();
	const initial = name ?name.slice(0, 1) : '';
	return (
		<div className="avatar"
			style={{
				display: "flex",
				// flex: 1,
				justifyContent: "center",
				alignItems: "center",
				margin: 10,
			}}
		>
			
			<div style={style}>
				{/* <p style={{ margin: 0, fontSize: 30 }}>{initial}</p> */}
				<img src={avbg} width={75} height={75} />
			</div>
		</div>
	);
};

export default Avatar;
