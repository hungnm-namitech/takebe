"use client";
import ICON from "@/app/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const NewDetail = (props: Props) => {
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
    <div className="text-center mx-[25px] tablet:mx-0 flex flex-col gap-[70px] items-center justify-center my-24">
      <div className="font-bold tablet:mx-0 text-[24px] tablet:text-[30px] tracking-[3px] leading-10">
        <p className="font-zen-maru-gothic">お知らせタイトルがここに入ります</p>
        <p className="text-[15px] tablet:text-[30px] text-bold text-primary">
          yyyy/mm/dd
        </p>
      </div>
      <div className="bg-[#D9D9D9] w-[325px] tablet:w-[866px] h-[202px] tablet:h-[527px] text-[15px] tablet:text-[40px] flex items-center justify-center font-normal tracking-[4px]">
        <p>写真が必要な場合ここに貼る</p>
      </div>
      <div className="tablet:max-w-[827px] flex flex-col gap-10 text-[15px] text-left tablet:text-center font-normal leading-10 tracking-[1.5px]">
        <p>
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。
        </p>
        <p>
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。
        </p>
      </div>
      <div className=" bg-secondary tablet:w-[300px] w-full h-[60px] rounded-[100px] flex gap-8 items-center justify-center cursor-pointer">
        <Image
          className="rotate-180"
          src={ICON.RECTARROW}
          width={8.3}
          height={8.3}
          alt="arrow rectangle"
        />
        <p className="text-xl font-bold leading-10 text-white font-bold">
          お知らせ一覧に戻る
        </p>
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

export default NewDetail;
