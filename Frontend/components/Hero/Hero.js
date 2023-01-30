import React from "react";
import classes from "./Hero.module.css";
const Hero = () => {
  return (
    <section className={classes.section__hero}>
      <img
        className={classes.hero__img}
        src="/images/bg1.png"
        alt="bg-home"
      />
      <img
        className={classes.hero__img}
        src="/images/rock1.png"
        alt="rock"
      />
      <img
        className={classes.hero__img}
        src="/images/girl1.png"
        alt="bg-home"
      />
      <div className={classes.cnt__box}>
        <h4>Here`s what a trip to the best rainforest</h4>
        <p>
          ngutan is a sustainable travel.magazine for travel stories that divé
          into worlds beyond our own, and the people and cultures that inhabit
          those places.
        </p>
        <button>read more</button>
      </div>
    </section>
  );
};

export default Hero;
