import { Lato } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/shared/UI/Header";
import Hero from "@/components/Hero/Hero";
import SectionCards from "@/components/tourCards/sectionCards";
const LatoClass = Lato({
  weight: "400",
  subsets: ["latin"],
});
export default function Home({ tours }) {
  return (
    <>
      <main className={LatoClass.className}>
        <Header />
        <Hero />
        <SectionCards tours={tours} />
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const fetchApi = await fetch(`${process.env.API_URl}/api/tours`);

  const data = await fetchApi.json();

  return {
    props: {
      tours: data.docs,
    },
  };
}
