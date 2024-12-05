import type { MouseEventHandler } from "react";

interface ButtonProps {
    text: string;
    clickHandler: MouseEventHandler;
    alignment: string;
    disable: boolean;
}

export default function Button({
    text,
    clickHandler,
    alignment,
    disable,
}: ButtonProps) {
    const styles =
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " +
        alignment;

    return (
        <>
            {disable && (
                <button
                    className={
                        styles +
                        " disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    }
                    onClick={clickHandler}
                    disabled
                >
                    {text}
                </button>
            )}

            {!disable && (
                <button className={styles} onClick={clickHandler}>
                    {text}
                </button>
            )}
        </>
    );
}
