import Image from "next/image";
import Hero from "./components/hero";
import About from "./components/about";
import Timeline from "./components/timeline";
import Credential from "./components/credential";
import PaymentBox from "./components/payment";
import Timer from "./components/timer";

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-between screen-max-width">
      <Hero />
      <About />
      <Timer/>
      {/* <Timer/> */}
      <Credential />
      <Timeline />
      {/* <PaymentBox /> */}
    
    </div>
  );
}
