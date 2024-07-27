import { auth } from "@/auth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/sign-in");
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
