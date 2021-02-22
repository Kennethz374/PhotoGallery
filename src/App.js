import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function App() {
	return (
		<main>
			<section className="search">
				<form className="search-form">
					<input type="text" className="search-input" />
					<FaSearch />
				</form>
			</section>

			<section className="photos"></section>
		</main>
	);
}

export default App;
