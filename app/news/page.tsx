"use client";

import React, { useEffect, useState } from "react";
import { TextField } from "../components/Text";
import { Paragraph } from "../components/Paragraph";
import Image from "next/image";
import ICON from "../assets";

type Props = {};

const NewsList = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.body.scrollHeight - window.innerHeight;
      setIsVisible(scrollPosition > documentHeight * 0.05);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollTopPage = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="my-[80px] tablet:my-[160px] mx-[25px] tablet:mx-[265px]">
      <TextField className="tracking-[2.8px] text-center">実施概要</TextField>
      <div className="mt-[100px] w-full flex flex-col gap-10">
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/2/28
          </Paragraph>
          <Paragraph>3月分のリサーチの予約を開始しました</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/2/24
          </Paragraph>
          <Paragraph>リサーチの人数が147人を突破しました！ </Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/1/31
          </Paragraph>
          <Paragraph>2月分のリサーチの予約を開始しました</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/2/28
          </Paragraph>
          <Paragraph>3月分のリサーチの予約を開始しました</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/2/24
          </Paragraph>
          <Paragraph>リサーチの人数が147人を突破しました！</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/1/31
          </Paragraph>
          <Paragraph>2月分のリサーチの予約を開始しました</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/1/31
          </Paragraph>
          <Paragraph>2月分のリサーチの予約を開始しました</Paragraph>
        </div>
        <div>
          <Paragraph className="border-b-2 font-fredoka-one text-primary border-primary pb-[10px] text-[15px]">
            2024/1/31
          </Paragraph>
          <Paragraph>2月分のリサーチの予約を開始しました</Paragraph>
        </div>
      </div>
      <div
        className={`fixed bottom-[5%] right-4 cursor-pointer animate-bounce ${
          isVisible ? "block" : "hidden"
        }`}
        onClick={handleScrollTopPage}
      >
        <Image
          src={ICON.ARROWUP}
          width={40}
          height={40}
          alt="slide to top page"
        />
      </div>
    </div>
  );
};

export default NewsList;
