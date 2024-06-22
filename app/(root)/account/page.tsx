import AccountContent from "@/components/AccountContent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageHeading from "@/components/PageHeading";
import SideBar from "@/components/SideBar";

import React from "react";

const Account = () => {
  return (
    <section className="home">
      <SideBar />
      <div className="home-content">
        <header className="home-header">
          <Header />
        </header>

        <section className="px-2">
          <AccountContent />
        </section>
      </div>
    </section>
  );
};

export default Account;
