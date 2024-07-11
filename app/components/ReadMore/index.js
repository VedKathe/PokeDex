// Filename - components/ReadMore.js

import React, { useState } from "react";

const ReadMore = ({ children }) => {
    
	const text = children;
	const [isReadMore, setIsReadMore] = useState(true);
	const toggleReadMore = () => {
		setIsReadMore(!isReadMore);
	};
	return (
		<p className="text">
			{isReadMore ? text.slice(0, 400) : text}
			<span
				onClick={toggleReadMore}
				className="read-or-hide"
				style={{ color: "green", textAlign:'justify' }}
			>
				{isReadMore ? "...read more" : " show less"}
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
