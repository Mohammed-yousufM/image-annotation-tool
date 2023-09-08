import { useRef, useEffect } from "react";
import { Rect, Transformer } from "react-konva";

function BoundingBox({ shapeProps, isSelected, onSelect, onChange }) {
	const transformerRef = useRef(null);
	const boxRef = useRef(null);

	useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			transformerRef.current.nodes([boxRef.current]);
			transformerRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<>
			<Rect
				{...shapeProps}
				x={shapeProps.x1}
				y={shapeProps.y1}
				width={shapeProps.x2 - shapeProps.x1 || 0}
				height={shapeProps.y2 - shapeProps.y1 || 0}
				ref={boxRef}
				onMouseDown={onSelect}
				onTransformEnd={() => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = boxRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// // we will reset it back
					node.scaleX(1);
					node.scaleY(1);

					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						// set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			/>

			{isSelected && (
				<Transformer
					ref={transformerRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</>
	);
}

export default BoundingBox;
