import BoundingBox from "./BoundingBox";

function BoundingBoxes({
	annotationsToDraw,
	selectedBoundingBox,
	selectBoundingBox,
	editBoundingBox,
}) {
	return (
		<>
			{annotationsToDraw &&
				annotationsToDraw.map((eachAnnotation, index) => (
					<BoundingBox
						key={index}
						shapeProps={eachAnnotation}
						isSelected={
							eachAnnotation?.id === selectedBoundingBox?.id
						}
						onSelect={() => selectBoundingBox(eachAnnotation)}
						onChange={(newAttrs) => {
							editBoundingBox(newAttrs, index);
						}}
					/>
				))}
		</>
	);
}

export default BoundingBoxes;
