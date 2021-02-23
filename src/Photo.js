import React from "react";

function Photo() {
	return (
		<li className="photo">
			<img
				src="https://images.unsplash.com/photo-1613855233638-8494b9d6247c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNzY2ODF8MHwxfGFsbHwyfHx8fHx8Mnw&ixlib=rb-1.2.1&q=80&w=1080"
				alt="random img"
			/>
			<div className="img-info">
				<div className="user">
					<h4>KEN ZHANG</h4>
					<p>12 likes</p>
				</div>
				<a href="">
					<img
						src="https://images.unsplash.com/photo-1613876654199-92cfed5a07a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNzY2ODF8MHwxfGFsbHwyNHx8fHx8fDJ8&ixlib=rb-1.2.1&q=80&w=1080"
						alt="avatar"
						className="user-avartar"
					/>
				</a>
			</div>
		</li>
	);
}

export default Photo;
