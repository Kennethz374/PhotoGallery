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
		setPage(1);
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
			setIsLoading(false);
			setPhotos((oldPhotos) => {
				if (query && page === 1) {
					return data.results;
				} else if (query) {
					return [...oldPhotos, ...data.results];
				} else {
					return [...oldPhotos, ...data];
				}
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPhotos();
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener("scroll", () => {
			if (
				!isLoading &&
				window.innerHeight + window.scrollY >= document.body.scrollHeight - 5
			) {
				setPage((page) => {
					return page + 1;
				});
			}
		});
		return window.removeEventListener("scroll", event);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main>
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
