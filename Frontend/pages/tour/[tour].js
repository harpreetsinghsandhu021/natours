import React from "react";
import Head from "next/head";
import { Lato } from "@next/font/google";
import Header from "@/components/shared/UI/Header";
import Tour from "../../components/particularTour/Tour";

const LatoClass = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const tour = ({ tour }) => {
  return (
    <>
      <main className={`${LatoClass.className} main--tour--page`}>
        <Header color="#000" />
        <Tour tour={tour} />
      </main>
    </>
  );
};

export async function getServerSideProps(context) {
  const fetchApi = await fetch(
    `${process.env.API_URL}/api/tours?slug=${context.query.tour}`
  );

  const data = await fetchApi.json();

  return {
    props: {
      tour: data.docs,
    },
  };
}

export default tour;
