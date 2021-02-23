import React from "react";

function Photo(props) {
	const {
		urls: { regular },
		alt_description,
		likes,
		user: {
			name,
			portfolio_url,
			profile_image: { medium },
		},
	} = props;
	return (
		<li className="photo">
			<img src={regular} alt={alt_description} />
			<div className="img-info">
				<div className="user">
					<h4>{name}</h4>
					<p>Likes: {likes}</p>
				</div>
				<a href={portfolio_url}>
					<img src={medium} alt="avatar" className="user-avartar" />
				</a>
			</div>
		</li>
	);
}

export default Photo;
