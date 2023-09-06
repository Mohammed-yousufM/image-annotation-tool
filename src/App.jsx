import { IconButton } from "./components/IconButton";
import "./App.css";

function App() {
	return (
		<main className="main">
			<h1 className="main__heading">Image Annotation Tool</h1>
			<section className="main__section">
				<IconButton
					iconName="left-arrow"
					onClickBtn={() => console.log("Clicked left")}
				/>
				<div>Image preview</div>
				<IconButton
					iconName="right-arrow"
					onClickBtn={() => console.log("Clicked right")}
				/>
			</section>
		</main>
	);
}

export default App;
