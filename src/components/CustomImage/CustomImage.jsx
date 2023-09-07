import { Image, Layer } from "react-konva";
import useImage from "use-image";

function CustomImage({ imageUrl }) {
	const [image] = useImage(imageUrl, "Anonymous");

	return (
		<Layer>
			<Image image={image} />
		</Layer>
	);
}

export default CustomImage;
