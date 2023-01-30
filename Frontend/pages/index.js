import { Lexend } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/shared/UI/Header";
import Hero from "@/components/Hero/Hero";
import SectionCards from "@/components/tourCards/sectionCards";
import Footer from "@/components/shared/UI/Footer";

export default function Home({ tours }) {
  return (
    <>
      <main className={` ${styles.main__home}`}>
        <Header />
        <Hero />
        <SectionCards tours={tours} />
        <Footer />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const fetchApi = await fetch(`${process.env.API_URL}/api/tours`);

  const data = await fetchApi.json();

  return {
    props: {
      tours: data.docs,
    },
  };
}
