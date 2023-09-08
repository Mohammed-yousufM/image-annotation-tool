import Icons from "../../../assets/icons/sprite.svg";
import "./iconButton.css";

function IconButton({ iconName, onClickBtn, disabled }) {
	const onClickHandle = () => {
		onClickBtn();
	};

	return (
		<button
			className="iconButton"
			onClick={onClickHandle}
			disabled={disabled}
		>
			<svg>
				<use xlinkHref={`${Icons}#${iconName}`}></use>
			</svg>
		</button>
	);
}

export default IconButton;
