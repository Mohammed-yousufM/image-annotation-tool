import { useState } from "react";
import { Stage } from "react-konva";
import CustomImageWrapper from "./CustomImageWrapper";
import CustomImage from "./CustomImage";
import { IconButton } from "../IconButton";
import { IMAGE_LIST } from "../../constants";

function ImageAnnotation() {
	//getting the data from Array using index is more performant that searching a big Array for required data
	//so, not saving image data itself in state
	const [imageIndex, setImageIndex] = useState(0); //0 is first index of the IMAGE_LIST data array

	const onClickLeft = () => {
		//easily update the required index to render correct image
		setImageIndex((prev) => {
			if (prev !== 0) {
				return prev - 1;
			}
			return prev;
		});
	};

	const onClickRight = () => {
		//easily update the required index to render correct image
		setImageIndex((prev) => {
			if (prev !== IMAGE_LIST.length - 1) {
				return prev + 1;
			}
			return prev;
		});
	};

	return (
		<section className="main__section">
			<IconButton
				iconName="left-arrow"
				onClickBtn={onClickLeft}
				disabled={imageIndex === 0}
			/>
			<Stage width={500} height={500}>
				{/* render props pattern as the CustomImage component requires only image url to render the image - scalabe this way*/}
				<CustomImageWrapper imageData={IMAGE_LIST[imageIndex]}>
					{({ imageUrl }) => <CustomImage imageUrl={imageUrl} />}
				</CustomImageWrapper>
			</Stage>
			<IconButton
				iconName="right-arrow"
				onClickBtn={onClickRight}
				disabled={imageIndex === IMAGE_LIST.length - 1}
			/>
		</section>
	);
}

export default ImageAnnotation;
