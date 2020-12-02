import React from "react";
import classes from "../styles/Card.module.css";

interface CardProps {
    title: string;
    price: string | number;
    category: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ title, category, price, onClick}): React.ReactElement => {
    return (
        <div className={classes.container}>
            <div>
                <p className={classes.categoryTypography}>{category}</p>
                <h2 className={classes.titleTypography}>{title}</h2>
            </div>
            <div className={classes.sectionAction}>
                <div className={classes.sectionPrice}>
                    <span className={classes.priceIconTypography}>
                        $
                    </span>
                    <p className={classes.priceTypography}>
                        {price}
                    </p>
                </div>
                <button className={classes.containerBtn} onClick={onClick}>Buy</button>
            </div>
        </div>
    )
}

export default Card;