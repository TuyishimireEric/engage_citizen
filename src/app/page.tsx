import { Footer } from "@/components/common/Footer";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Welcome } from "@/components/home/Welcome";

export default function Home() {
  return (
    <div className="bg-primary-500 text-primary-100">
      <Welcome />
      <HowItWorks />
      <Footer />
    </div>
  );
}
