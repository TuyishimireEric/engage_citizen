import { Footer } from "@/components/common/Footer";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Welcome } from "@/components/home/Welcome";

export default function Home() {
  return (
    <div>
      <Welcome />
      <HowItWorks />
      <Footer />
    </div>
  );
}
