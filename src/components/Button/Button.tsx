import { Dispatch, SetStateAction } from "react";
import css from "./Button.module.css";

type Props = {
	setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function Button({ setCurrentPage }: Props) {
	return (
		<button
			onClick={() => {
				setCurrentPage(prev => prev + 1);
			}}
			className={css.Button}
		>
			Load More
		</button>
	);
}
