import React from "react";
import Table from "../table/table";
import Header from "../header/header";
import "./home.css";

const data = [
  {
    name: "Global-Market",
    detail: [
      {
        name: "FTCNBC",
        price: 10820.25,
        change: 159.06,
        ChnagePerCentage: "1.50%",
      },
      {
        name: "DJIA",
        price: 536.25,
        change: 59.06,
        ChnagePerCentage: "3.50%",
      },
      {
        name: "DJWORLD",
        price: 1082.25,
        change: 177.06,
        ChnagePerCentage: "5.50%",
      },
      {
        name: "S&P 500",
        price: 1000.25,
        change: 100.06,
        ChnagePerCentage: "6.50%",
      },
    ],
  },
  {
    name: "Aisa-Pacific",
    detail: [
      {
        name: "FTCNBC",
        price: 10820.25,
        change: 159.06,
        ChnagePerCentage: "1.50%",
      },
      {
        name: "DJIA",
        price: 536.25,
        change: 59.06,
        ChnagePerCentage: "3.50%",
      },
      {
        name: "DJWORLD",
        price: 1082.25,
        change: 177.06,
        ChnagePerCentage: "5.50%",
      },
      {
        name: "S&P 500",
        price: 1000.25,
        change: 100.06,
        ChnagePerCentage: "6.50%",
      },
    ],
  },
  {
    name: "Europe",
    detail: [
      {
        name: "FTCNBC",
        price: 10820.25,
        change: 159.06,
        ChnagePerCentage: "1.50%",
      },
      {
        name: "DJIA",
        price: 536.25,
        change: 59.06,
        ChnagePerCentage: "3.50%",
      },
      {
        name: "DJWORLD",
        price: 1082.25,
        change: 177.06,
        ChnagePerCentage: "5.50%",
      },
      {
        name: "S&P 500",
        price: 1000.25,
        change: 100.06,
        ChnagePerCentage: "6.50%",
      },
    ],
  },
  {
    name: "Americas",
    detail: [
      {
        name: "FTCNBC",
        price: 10820.25,
        change: 159.06,
        ChnagePerCentage: "1.50%",
      },
      {
        name: "DJIA",
        price: 536.25,
        change: 59.06,
        ChnagePerCentage: "3.50%",
      },
      {
        name: "DJWORLD",
        price: 1082.25,
        change: 177.06,
        ChnagePerCentage: "5.50%",
      },
      {
        name: "S&P 500",
        price: 1000.25,
        change: 100.06,
        ChnagePerCentage: "6.50%",
      },
    ],
  },
];

function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <h2>Worlds Market Data</h2>
        <div className="gap"></div>
        <div className="tables">
          {data.map((item) => (
            <Table key={item} data={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
