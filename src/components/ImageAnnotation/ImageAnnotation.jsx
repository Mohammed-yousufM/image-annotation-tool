import { useState } from "react";
import { Layer, Stage } from "react-konva";
import CanvasWrapper from "./CanvasWrapper";
import BoundingBoxes from "./BoundingBoxes";
import CustomImage from "./CustomImage";
import { IMAGE_LIST } from "../../constants";
import { IconButton, NamedButton } from "../customButton";
import { downloadObjectAsJson } from "../../utils/utils";
import "./imageAnnotation.css";

function ImageAnnotation() {
	//getting the data from Array using index is more performant that searching a big Array for required data
	//so, not saving image data itself in state
	const [imageIndex, setImageIndex] = useState(0); //0 is first index of the IMAGE_LIST data array

	const [savedAnnotations, setSavedAnnotations] = useState({});
	const [localAnnotations, setLocalAnnotations] = useState([]);

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

	const onClickSave = () => {
		const imageId = IMAGE_LIST[imageIndex]?.imageId;

		setSavedAnnotations((prev) => ({
			...prev,
			[imageId]: prev?.[imageId]
				? [...prev[imageId], ...localAnnotations]
				: [...localAnnotations],
		}));

		setLocalAnnotations([]);
	};

	const onClickDownload = () => {
		downloadObjectAsJson({
			exportObj: savedAnnotations,
			exportName: `annotations-data`,
		});
	};

	const imageId = IMAGE_LIST[imageIndex]?.imageId;
	return (
		<div className="imageAnnotation">
			<section className="imageAnnotation__section">
				<IconButton
					iconName="left-arrow"
					onClickBtn={onClickLeft}
					disabled={imageIndex === 0}
				/>
				{/* Render props patters - separate business logic into a wrapper */}
				<CanvasWrapper
					imageIndex={imageIndex}
					imageId={imageId}
					savedAnnotations={savedAnnotations[imageId]}
					setSavedAnnotations={setSavedAnnotations}
					localAnnotations={localAnnotations}
					setLocalAnnotations={setLocalAnnotations}
				>
					{({
						annotationsToDraw,
						selectedBoundingBox,
						handleMouseEnter,
						removeBoundingBox,
						startNewBox,
						recordBoxCoordinates,
						finishNewBox,
						selectBoundingBox,
						editBoundingBox,
						clearBoundingBoxSelection,
					}) => (
						<div onKeyDown={removeBoundingBox} tabIndex={1}>
							<Stage
								width={500}
								height={500}
								onMouseEnter={(event) =>
									handleMouseEnter(event)
								}
								onMouseDown={(event) => startNewBox(event)}
								onMouseMove={(event) =>
									recordBoxCoordinates(event)
								}
								onMouseUp={(event) => finishNewBox(event)}
							>
								<Layer>
									<CustomImage
										imageUrl={
											IMAGE_LIST[imageIndex]?.imageUrl
										}
										onMouseDown={clearBoundingBoxSelection}
									/>
									<BoundingBoxes
										annotationsToDraw={annotationsToDraw}
										selectedBoundingBox={
											selectedBoundingBox
										}
										selectBoundingBox={selectBoundingBox}
										editBoundingBox={editBoundingBox}
									/>
								</Layer>
							</Stage>
						</div>
					)}
				</CanvasWrapper>

				<IconButton
					iconName="right-arrow"
					onClickBtn={onClickRight}
					disabled={imageIndex === IMAGE_LIST.length - 1}
				/>
			</section>

			<section className="imageAnnotation__actions">
				<NamedButton btnName="Save" onClick={onClickSave} />
				<NamedButton
					btnName="Download Json"
					onClick={onClickDownload}
				/>
			</section>
		</div>
	);
}

export default ImageAnnotation;
