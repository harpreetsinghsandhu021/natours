import React from "react";
import Header from "@/components/shared/UI/Header";
import Form from "@/components/shared/UI/Form";

const addTour = () => {
  return (
    <>
      <Header />
      <main className="main--add-tour">
        <Form addTour />
      </main>
    </>
  );
};

export default addTour;
