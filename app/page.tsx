import Image from "next/image";
import Hero from "./components/hero";
import About from "./components/about";
import Timeline from "./components/timeline";
import Credential from "./components/credential";
import PaymentBox from "./components/payment";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Hero/>
      <About/>
      <Timeline/>
      <Credential/>
      <PaymentBox/>
    </div>
  );
}
