import type { MouseEventHandler } from "react";

interface ButtonProps {
	text: string,
	clickHandler: MouseEventHandler,
	alignment: string
}

export default function Button({text, clickHandler, alignment}: ButtonProps) {

	const styles =
	"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
	+ alignment

	return (
		<button
		className={styles}
		onClick={clickHandler}>
			{text}
		</button>
	);
}