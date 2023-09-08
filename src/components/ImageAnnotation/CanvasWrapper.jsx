import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

const boxStyle = {
	fill: "transparent",
	stroke: "red",
	strokeWidth: 2,
};

function CanvasWrapper({
	imageIndex,
	imageId,
	savedAnnotations,
	setSavedAnnotations,
	localAnnotations,
	setLocalAnnotations,
	children,
}) {
	const [newAnnotation, setNewAnnotation] = useState([]);
	const [selectedBoundingBox, setSelectedBoundingBox] = useState(null);

	useEffect(() => {
		return () => {
			setLocalAnnotations([]);
			setNewAnnotation([]);
			setSelectedBoundingBox(null);
		};
	}, [imageIndex, imageId, setLocalAnnotations]);

	const handleMouseEnter = (event) => {
		event.target.getStage().container().style.cursor = "crosshair";
	};

	const removeBoundingBox = (event) => {
		if (event.keyCode === 8 || event.keyCode === 46) {
			if (selectedBoundingBox !== null) {
				const filteredAnnotations = localAnnotations.filter(
					(annotation) => {
						return annotation.id !== selectedBoundingBox.id;
					}
				);
				setLocalAnnotations(filteredAnnotations);

				if (Array.isArray(savedAnnotations)) {
					const filteredSavedAnnotations = savedAnnotations.filter(
						(annotation) => {
							return annotation.id !== selectedBoundingBox.id;
						}
					);
					setSavedAnnotations((prev) => ({
						...prev,
						[imageId]: filteredSavedAnnotations,
					}));
				}
			}
		}
	};

	const startNewBox = (event) => {
		if (selectedBoundingBox === null && newAnnotation.length === 0) {
			//start coordinates of box
			const { x, y } = event.target.getStage().getPointerPosition();
			const id = uuid();
			setNewAnnotation([
				{
					...boxStyle,
					x1: x,
					y1: y,
					x2: x,
					y2: y,
					id,
				},
			]);
		}
	};

	const recordBoxCoordinates = (event) => {
		if (selectedBoundingBox === null && newAnnotation.length === 1) {
			//sx - left x
			//sy - top y

			//x - right x (box end)
			//y - bottom y (box end)
			const sx = newAnnotation[0].x1;
			const sy = newAnnotation[0].y1;
			const { x, y } = event.target.getStage().getPointerPosition();
			const id = uuid();
			setNewAnnotation([
				{
					...boxStyle,
					x1: sx,
					y1: sy,
					x2: x,
					y2: y,
					id,
				},
			]);
		}
	};

	const finishNewBox = () => {
		if (selectedBoundingBox === null && newAnnotation.length === 1) {
			const tempAnnotations = [...localAnnotations];
			tempAnnotations.push(...newAnnotation);
			setLocalAnnotations(tempAnnotations);

			setNewAnnotation([]);
		}
	};

	const selectBoundingBox = (annotation) => {
		setSelectedBoundingBox(annotation);
	};

	const editBoundingBox = (newAttrs, index) => {
		const rects = localAnnotations.slice();
		rects[index] = newAttrs;
		setLocalAnnotations(rects);
	};

	const clearBoundingBoxSelection = () => {
		setSelectedBoundingBox(null);
	};

	const annotationsToDraw = Array.isArray(savedAnnotations)
		? [...savedAnnotations, ...localAnnotations, ...newAnnotation]
		: [...localAnnotations, ...newAnnotation];

	return children({
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
	});
}

export default CanvasWrapper;
