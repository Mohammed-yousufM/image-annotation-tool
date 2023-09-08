import { Image } from "react-konva";
import useImage from "use-image";

function CustomImage({ imageUrl, onMouseDown }) {
	const [image] = useImage(imageUrl, "Anonymous");

	return <Image image={image} onMouseDown={onMouseDown} />;
}

export default CustomImage;
