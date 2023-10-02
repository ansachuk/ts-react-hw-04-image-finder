import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";

import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

import fetchPhotos from "../../services/fetchPhotos";
import { Image } from "../../@types/types";

export default function App() {
	const [images, setImages] = useState<Array<Image>>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showLoader, setShowLoader] = useState(false);
	const [currentModalImg, setCurrentModalImg] = useState<Pick<Image, "largeImageURL" | "tags">>({
		largeImageURL: "",
		tags: "",
	});
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentModalImg({
			largeImageURL: "",
			tags: "",
		});
	};

	const closeModalOnESCPress = (e: KeyboardEvent<Window>) => {
		if (e.code === "Escape") {
			return closeModal();
		}
	};

	const closeModalOnClick = (e: MouseEvent<HTMLDivElement>) => {
		const { currentTarget, target } = e;

		if (currentTarget === target) {
			return closeModal();
		}
	};

	const onImgClick = (e: MouseEvent<HTMLLIElement>) => {
		const currentImg = images.find(image => image.id === Number((e.target as HTMLImageElement).id));
		if (currentImg) {
			setCurrentModalImg(currentImg);
			setIsModalOpen(!isModalOpen);
		}
	};

	useEffect(() => {
		if (!searchQuery) {
			return;
		}

		async function fetchSearchQuery() {
			setShowLoader(true);

			const searchPhotos = await fetchPhotos(searchQuery, currentPage);
			if (currentPage === 1) {
				setImages([...searchPhotos]);
			} else {
				setImages(prev => [...prev, ...searchPhotos]);
			}

			setShowLoader(false);
		}

		fetchSearchQuery();
	}, [currentPage, searchQuery]);

	return (
		<>
			<Searchbar setSearchQuery={setSearchQuery} setCurrentPage={setCurrentPage}></Searchbar>

			{images.length > 0 && (
				<ImageGallery>
					{images.map(({ tags, webformatURL, id }) => (
						<ImageGalleryItem onClick={onImgClick} key={id} id={id} webURL={webformatURL} tags={tags} />
					))}
				</ImageGallery>
			)}

			<Loader visible={showLoader} />

			{searchQuery && images.length > 0 && <Button setCurrentPage={setCurrentPage} />}

			{isModalOpen && <Modal closeModalOnESCPress={closeModalOnESCPress} closeModal={closeModalOnClick} currentModalImg={currentModalImg} />}
		</>
	);
}
