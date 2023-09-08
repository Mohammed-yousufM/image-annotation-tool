import "./namedButton.css"

function NamedButton({ btnName, onClick }) {
	return (
		<button className="namedButton" onClick={onClick}>
			{btnName}
		</button>
	);
}

export default NamedButton;
