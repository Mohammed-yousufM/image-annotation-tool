import "./App.css";
import { ImageAnnotation } from "./components/ImageAnnotation";

function App() {
	return (
		<main className="main">
			<h1 className="main__heading">Image Annotation Tool</h1>
			<ImageAnnotation />
		</main>
	);
}

export default App;
