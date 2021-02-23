import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "../src/Photo";
import Loading from "../src/Loading";

function App() {
	const [photos, setPhotos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState("");
	const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
	const mainUrl = `https://api.unsplash.com/photos/`;
	const searchUrl = `https://api.unsplash.com/search/photos/`;

	const handleSubmit = (e) => {
		e.preventDefault();
		setPage(() => 1);
	};
	const fetchPhotos = async () => {
		setIsLoading(true);
		let url;
		const urlPage = `&page=${page}`;
		const urlQuery = `&query=${query}`;
		if (query) {
			url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
		} else {
			url = `${mainUrl}${clientID}${urlPage}`;
		}
		try {
			const response = await fetch(`${url}`);
			const data = await response.json();

			setPhotos((oldPhotos) => {
				//when the first time click search handleSubmit will setPage = 1
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					// after search, scroll down will trigger page 2, we want to return old photo and page 2 photo
					return [...oldPhotos, ...data.results];
				} else {
					// when no query we just keep old photo and push new photos into the photo
					return [...oldPhotos, ...data];
				}
			});
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPhotos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!isLoading &&
				window.innerHeight + window.scrollY >= document.body.scrollHeight - 5
			) {
				setPage((page) => {
					if (page === 0) {
						return 2;
						//if page is 0 it default show page 1, if no query and scroll down we want page 2 instead of page 1 again
					} else {
						return page + 1;
					}
				});
			}
		});
		return window.removeEventListener("scroll", event);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
			<header>PHOTO GALLERY</header>
			<section className="search">
				<form className="search-form">
					<input
						type="text"
						className="search-input"
						placeholder="Search "
						onChange={(e) => setQuery(e.target.value)}
						value={query}
					/>
					<button className="submit-btn" type="submit" onClick={handleSubmit}>
						<FaSearch />
					</button>
				</form>
			</section>
			<>
				<ul className="photos">
					{photos.map((photo) => {
						return <Photo key={photo.id} {...photo} />;
					})}

					<li></li>
				</ul>
				{isLoading && <Loading />}
			</>
		</main>
	);
}

export default App;
