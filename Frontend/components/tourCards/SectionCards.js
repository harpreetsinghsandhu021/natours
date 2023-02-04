import React, { useEffect, useState } from "react";
import Wrapper from "../shared/components/Wrapper";
import gsap from "gsap";
import classes from "./SectionCard.module.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ReactPaginate from "react-paginate";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const SectionCards = ({ tours, count }) => {
  const [data, setData] = useState(tours);
  useEffect(() => {
    // gsap.to(
    //   "#section--cards",
    //   {
    //     y: "-60%",
    //     duration: 10,
    //     zIndex: 9999,
    //     scrollTrigger: {
    //       trigger: "#section--cards",
    //       scrub: true,
    //       start: "0 0",
    //     },
    //   },
    //   "-=10"
    // );
    // gsap.fromTo(
    //   "#hero--section--heading",
    //   {
    //     opacity: 0,
    //   },
    //   {
    //     opacity: 1,
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: "#section--hero",
    //       scrub: true,
    //       start: "100% 100%",
    //     },
    //   }
    // );
  }, []);

  async function handlePageClick(e) {
    const fetchApi = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tours?page=${e.selected + 1}`
    );

    const data = await fetchApi.json();

    data && setData(data.docs);
  }

  return (
    <>
      <section
        style={{ padding: "8rem 0", position: "relative" }}
        id="section--cards"
      >
        <h3 id="hero--section--heading" className="hero--heading">
          Our Tours
        </h3>
        <Wrapper>
          {data.map((tour) => {
            return <Card tour={tour} />;
          })}
        </Wrapper>
        <ReactPaginate
          className={classes.pagination}
          breakLabel="..."
          nextLabel={
            <span className={classes.arrow}>
              <AiOutlineRight />
            </span>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageLinkClassName={classes.page__link}
          pageCount={count / 10}
          activeLinkClassName={classes.active}
          previousLabel={
            <span className={classes.arrow}>
              <AiOutlineLeft />
            </span>
          }
        />
      </section>
    </>
  );
};

export default SectionCards;
