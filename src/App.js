import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "../src/Photo";
import Loading from "../src/Loading";

const url = `https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
	const [photos, setPhotos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("I click the button");
	};
	const fetchPhotos = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${url}`);
			const data = await response.json();
			console.log(data);
			setIsLoading(false);
			setPhotos(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, []);
	if (isLoading) {
		return <Loading />;
	} else {
		return (
			<main>
				<section className="search">
					<form className="search-form">
						<input
							type="text"
							className="search-input"
							placeholder="Search Here"
						/>
						<button className="submit-btn" type="submit" onClick={handleSubmit}>
							<FaSearch />
						</button>
					</form>
				</section>

				<ul className="photos">
					{photos.map((photo) => {
						return <Photo key={photo.id} {...photo} />;
					})}

					<li></li>
				</ul>
			</main>
		);
	}
}

export default App;
