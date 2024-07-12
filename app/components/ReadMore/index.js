// Filename - components/ReadMore.js

import React, { useState } from "react";

const ReadMore = ({ children }) => {
    
	const text = children.replace(/(\r\n|\n|\r|\f)/gm," ");;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className="text">
			{isReadMore ? text.slice(0, 398) : text}
			<span
				onClick={toggleReadMore}
				className="read-or-hide"
				style={{ color: "#2E3156", textAlign:'justify' ,fontWeight: "700",
					}}
			>
				{isReadMore ? " . . .read more" : " show less"}
			</span>
		</p>
	);
};

const Content = ({ text }) => {
	return (
		<div className="container">
			{/* <h2> */}
				<ReadMore>
					{text}
				</ReadMore>
			{/* </h2> */}
		</div>
	);
};

export default Content;
