import React from "react";
import "../Style/Homepage.css";

function CategoryCards(props) {
    return (
        <div className="Category">
            <div className="image-container"><img className="image-style" src={props.Groups.imageUrl} alt={props.Groups.name}/></div>
            <div>{props.Groups.name}</div>
        </div>
    );
};

export default CategoryCards;