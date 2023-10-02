import { MouseEvent, useEffect } from "react";

import { Image } from "../../@types/types";

import css from "./Modal.module.css";

type Props = {
	closeModalOnESCPress(e: { code: string }): void;
	closeModal(e: MouseEvent<HTMLDivElement>): void;
	currentModalImg: Pick<Image, "largeImageURL" | "tags">;
};

export default function Modal({ closeModalOnESCPress, closeModal, currentModalImg: { largeImageURL, tags } }: Props) {
	useEffect(() => {
		window.addEventListener("keydown", closeModalOnESCPress);

		return () => {
			window.removeEventListener("keydown", closeModalOnESCPress);
		};
	}, [closeModalOnESCPress]);

	return (
		<div onClick={closeModal} className={css.Overlay}>
			<div className={css.Modal}>
				<img src={largeImageURL} alt={tags} />
			</div>
		</div>
	);
}
