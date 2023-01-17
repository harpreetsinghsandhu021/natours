import React from "react";
import classes from "./Tour.module.css";
import TourHero from "./TourHero";
import TourInfo from "./TourInfo";
import TourMap from "./Map";

const Tour = ({ tour }) => {
  return (
    <>
      <section className={classes.section__tour}>
        <TourHero
          coverImage={tour[0].imageCover}
          heading={tour[0].summary}
          description={tour[0].description}
        />
        <TourInfo
          startDates={tour[0].startDates}
          level={tour[0].difficulty}
          people={tour[0].maxGroupSize}
          rating={tour[0].ratingsAverage}
          images={tour[0].images}
          guides={tour[0].guides}
        />
        <TourMap />
      </section>
    </>
  );
};

export default Tour;
