import { toast } from "react-hot-toast";

/** Delay timer */
function timer(delay: number = 1000) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

function toCopyBoard(str: string) {
    const textarea = document.createElement("textarea");
    textarea.textContent = str;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast.success("Copied to clipboard");
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

export { getRandomColor, timer, toCopyBoard };
