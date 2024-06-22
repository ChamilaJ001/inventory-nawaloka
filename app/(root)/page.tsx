import { auth } from "@/auth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideBar from "@/components/SideBar";

const Home = async () => {
  const session = await auth();
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <Hero />
      </div>
    </section>
  );
};

export default Home;
