import React, { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useContext } from "react";
import { AuthContext } from "@/components/shared/context/authContext";
import { Lexend } from "@next/font/google";
import Header from "@/components/shared/UI/Header";
import Footer from "@/components/shared/UI/Footer";
import Tour from "../../components/particularTour/Tour";
import { useRouter } from "next/router";

const LexendFont = Lexend({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
const tour = ({ tour }) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head></Head>
      <main className={`main--tour--page`}>
        <Header color="#000" />
        <Tour tour={tour} />
        <Footer black />
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
