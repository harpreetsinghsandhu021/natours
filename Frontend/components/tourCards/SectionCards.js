import React from "react";
import Wrapper from "../shared/components/Wrapper";
import Card from "./Card";

const SectionCards = ({ tours }) => {
  return (
    <>
      <h3 className="hero--heading">Our Tours</h3>
      <Wrapper>
        {tours.map((tour) => {
          return <Card tour={tour} />;
        })}
      </Wrapper>
    </>
  );
};

export default SectionCards;
