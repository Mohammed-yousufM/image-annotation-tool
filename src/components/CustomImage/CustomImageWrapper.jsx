function CustomImageWrapper({ imageData, children }) {
	return children({ imageUrl: imageData?.imageUrl });
}

export default CustomImageWrapper;
