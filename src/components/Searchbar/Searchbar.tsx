import { ChangeEvent, FormEvent, useState } from "react";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import icons from "../../icons/search.svg";
import makeSmoothScroll from "../../services/smoothScroll";

import css from "./Searchbar.module.css";

type Props = {
	setSearchQuery(query: string): void;
	setCurrentPage(page: number): void;
};

export default function Searchbar({ setSearchQuery, setCurrentPage }: Props) {
	const [query, setQuery] = useState("");

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.currentTarget.value);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (query.trim() !== "") {
			setSearchQuery(query);
			setCurrentPage(1);
			setTimeout(() => {
				makeSmoothScroll();
			}, 200);
		} else {
			Notify.warning("Please, enter a query!");

			setQuery("");
		}
	};

	return (
		<header className={css.searchbar}>
			<form className={css.form} onSubmit={onSubmit}>
				<button type="submit" className={css.button}>
					<span className={css.label}></span>

					<svg width="32" height="32">
						<use href={icons + "#search"}></use>
					</svg>
				</button>

				<input
					onChange={onInputChange}
					value={query}
					className={css.input}
					name="query"
					type="text"
					autoComplete="off"
					autoFocus
					placeholder="Search images and photos"
				/>
			</form>
		</header>
	);
}
