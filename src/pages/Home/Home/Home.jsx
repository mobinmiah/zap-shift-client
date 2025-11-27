import React, { Suspense } from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import Support from "../Support/Support";
import Priority from "../Priority/Priority";
import Reviews from "../Reviews/Reviews";
import FAQ from "../FAQ/FAQ";
import useAuth from "../../../hooks/useAuth";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  const { loading, setLoading } = useAuth();
  if (loading) {
    return setLoading(true);
  }
  return (
    <div>
      <title>Home | zapShip</title>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Brands></Brands>
      <Support></Support>
      <Priority></Priority>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <FAQ></FAQ>
    </div>
  );
};

export default Home;
