import React from "react";
import Link from "next/link";
import classes from "./Card.module.css";
import { AiFillCalendar } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import ReactStars from "react-stars";
import { AiTwotoneFlag } from "react-icons/ai";
import moment from "moment";
import { GoPerson } from "react-icons/go";

const Card = ({ tour }) => {
  return (
    <div className={classes.card}>
      <div className={classes.img__box}>
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/img/tours/${tour.imageCover}`}
          alt={tour.name}
        />
      </div>
      <h2 className={classes.tour__name}>{tour.name}</h2>
      <p>{tour.summary}</p>

      <p>
        <span className="color--span">{tour.price}&#8377;</span> per person
      </p>
      <div className={classes.stars__wrapper}>
        <ReactStars
          count={5}
          // onChange={ratingChanged}
          className={classes.stars}
          edit={false}
          value={tour.ratingsAverage}
          size={18}
          color2={"#ffd700"}
        />
        ratings ({tour.ratingsQuantity})
      </div>
      <div className={classes.info}>
        <div className="flex">
          <FiMapPin className={classes.svg__card__map} />
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="flex">
          <AiFillCalendar className={classes.svg__card} />
          <span>{moment(tour.startDates[0]).format("MMMM,YYYY ")}</span>
        </div>
        <div className="flex">
          <AiTwotoneFlag className={classes.svg__card} />
          <span>{tour.locations.length} stops</span>
        </div>
        <div className="flex">
          <GoPerson className={classes.svg__card} />
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>
      <Link href={`/tour/${tour.slug}`} className={classes.btn__cta}>
        Read more
      </Link>
    </div>
  );
};

export default Card;
