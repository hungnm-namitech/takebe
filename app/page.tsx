"use client";

import Image from "next/image";
import ICON from "./assets";
import { TextField } from "./components/Text";
import { Paragraph } from "./components/Paragraph";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import Loading from "./components/Loading";
import ScatterChart from "./components/ScatterChart";
import IndicatorChart from "./components/IndicatorChart";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { listMajors } from "./api/sheet/route";
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [comeUsTimes, setComeUsTime] = useState(1);
  const [peopleLeft, setPeopleLeft] = useState<number | string | any>();
  const [peopleWithData, setPeopleWithData] = useState<number | string | any>();
  const [fattyPeople, setFattyPeople] = useState<number | string | any>();
  const url = process.env.NEXT_PUBLIC_URL_SPREADSHEET as string;
  const arrTextComeUs = useMemo(
    () => Array.from({ length: comeUsTimes * 2 }, (_, index) => index),
    [comeUsTimes]
  );

  useEffect(() => {
    (async () => {
      const data = await getSheet1();
      console.log({ data });
    })();
  }, []);

  const getFileFromEndpoint = async (url: string): Promise<XLSX.WorkBook> => {
    let res: Response;

    try {
      res = await fetch(url);
    } catch (e) {
      throw new Error(`NetWork Error: ${(e as Error).message}`);
    }

    if (res.status == 404) {
      throw new Error("File not found");
    }
    if (res.status != 200) {
      throw new Error(`Server status ${res.status}: ${res.statusText}`);
    }

    let dataSheet;
    try {
      const file = await res.arrayBuffer();
      dataSheet = XLSX.read(file, { dense: true, type: "array" });
    } catch (e) {
      throw new Error(`Data Error: ${(e as Error).message}`);
    }

    return dataSheet;
  };

  const { isLoading, data: dataSheet } = useQuery({
    queryKey: ["data-sheet"],
    queryFn: () => getFileFromEndpoint(url),
    select(data) {
      return Object.values(data.Sheets)[0]["!data"];
    },
    staleTime: 5000,
  });

  const filterDataScatter = (arrRaw: Array<XLSX.CellObject[]>) => {
    const coorDinatesX: Array<number | any> = [];
    const coorDinatesY: Array<number | any> = [];
    arrRaw?.slice(2).forEach((coDinates) => {
      if (coDinates[2] && coDinates[3]) {
        coorDinatesX.push(coDinates[3].v);
        coorDinatesY.push(coDinates[2].v);
      }
    });
    return {
      coorDinatesX,
      coorDinatesY,
    };
  };

  // const filterDataIndicator = (arrRaw: Array<XLSX.CellObject[]>) => {
  //   setPeopleLeft(arrRaw[5][11].v);
  //   setPeopleWithData(arrRaw[3][11].v);
  //   setFattyPeople(arrRaw[4][11].v);
  //   return {
  //     participants: arrRaw[2][11].v as number,
  //   };
  // };

  const coordinates = useMemo(() => {
    if (dataSheet) return filterDataScatter(dataSheet);
  }, [dataSheet]);

  // const dataIndicator = useMemo(() => {
  //   if (dataSheet) return filterDataIndicator(dataSheet);
  // }, [dataSheet]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const recalculatedValue = Math.ceil(window.innerWidth / 934);
      setComeUsTime(recalculatedValue);
    }

    const handleResize = () => {
      setComeUsTime(Math.ceil(window.innerWidth / 934));
    };

    setComeUsTime(Math.ceil(window.innerWidth / 934));

    window.addEventListener("resize", handleResize);

    return () => window.addEventListener("resize", handleResize);
  }, []);
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
    <div className="mb-[194px]">
      <div className="bg-primary h-[541px] w-full relative overflow-hidden ">
        <Image
          className="absolute w-[653px] opacity-[0.5] h-[675px] tablet:top-[50%] tablet:left-[-3%] top-[30%] right-[60%]  pt-10"
          width={653}
          height={675}
          src={ICON.PLAQUE_LEFT}
          alt="PLAQUE"
        />
        <Image
          className="absolute w-[653px] opacity-[0.5] h-[675px] tablet:bottom-[50%] tablet:left-[-3%] bottom-[30%] right-[60%] pb-10 "
          width={653}
          height={675}
          src={ICON.PLAQUE_LEFT}
          alt="PLAQUE"
        />
        <Image
          className="absolute w-[653px] opacity-[0.5] h-[675px] tablet:top-[50%] tablet:right-[-3%] mobile:left-[60%] top-[30%] pt-10"
          width={653}
          height={675}
          src={ICON.PLAQUE_RIGHT}
          alt="PLAQUE"
        />
        <Image
          className="absolute w-[653px] opacity-[0.5] h-[675px] tablet:bottom-[50%] tablet:right-[-3%] bottom-[30%] mobile:left-[60%] pb-10"
          width={653}
          height={675}
          src={ICON.PLAQUE_RIGHT}
          alt="PLAQUE"
        />
        {/* Circle tablet and destop */}
        <div>
          <Image
            src={ICON.CIRCLE_TOP}
            alt="PLAQUE"
            width={470}
            height={470}
            className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] hidden tablet:block"
          />
          <Image
            src={ICON.CIRCLE_TOP}
            alt="PLAQUE"
            width={349}
            height={349}
            className="absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] tablet:hidden"
          />
        </div>
        <div>
          <div className="absolute w-[42px] tablet:w-[34.375%] h-[2px] bg-white top-[50%] -translate-y-[50%]"></div>
          <div className="absolute w-[42px] tablet:w-[34.375%] h-[2px] bg-white right-0 top-[50%] -translate-y-[50%]"></div>
          <div className="absolute w-[2px] h-[132px] tablet:h-[70px] bg-white left-[50%] -translate-x-[50%]"></div>
          <div className="absolute w-[2px] h-[132px] hidden tablet:block tablet:h-[70px] bg-white bottom-0 left-[50%] -translate-x-[50%]"></div>
          <div className="absolute w-[2px] h-[25px] tablet:h-[70px] bg-white tablet:hidden bottom-0 left-[50%] -translate-x-[50%]"></div>
          <div className="absolute w-[2px] h-[50px] tablet:h-[70px] bg-white tablet:hidden bottom-[80px] left-[50%] -translate-x-[50%]"></div>
        </div>
        <Image
          src={ICON.INTRO}
          alt="intro"
          className="absolute w-[280px] h-[219px] tablet:w-[320px] left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]"
        />
        <div className="absolute top-[8%] left-[5%] tablet:left-[30%] tablet:top-[15%]">
          <TextField
            className="text-[18px] tracking-[1.8px] tablet:text-[22px] tablet:tracking-[2.2px] bg-white py-[15px] text-center tablet:py-6 px-8 rounded-[1000px] relative"
            color="secondary"
          >
            <span className="hidden tablet:inline-block">参加型肝臓研究</span>
            <span className="tablet:hidden">
              参加型
              <br />
              肝臓研究
            </span>
          </TextField>
          <Image
            src={ICON.TAILMESSAGE}
            width={36}
            height={36}
            alt="tail message"
            className="absolute top-[99%] left-[50%] -translate-x-[50%]"
          />
        </div>
        <Image
          src={ICON.KANZO}
          width={169}
          height={87.2}
          alt="kanzo"
          className="absolute right-[75px] top-[36.18px] hidden tablet:block"
        />
        <Image
          src={ICON.KANZOTABLET}
          width={120}
          height={65.558}
          alt="kanzo"
          className="absolute right-[15px] top-[17px] tablet:hidden"
        />
        <div className="absolute bottom-[28.94px] tablet:left-10 text-center tablet:text-left left-[20%]">
          <p className="text-[15px] tablet:text-xl font-extrabold text-white leading-[26px] tracking-[2px] uppercase font-fredoka-one">
            Human Organoid Project
            <br />
            Laboratory
          </p>
        </div>
      </div>
      <div className="mt-[57px] font-black overflow-hidden whitespace-nowrap ">
        {arrTextComeUs.map((_, index) => (
          <div
            key={index}
            className={`h-full w-[894px] inline-block mr-10 animate-[slide-in-left-${comeUsTimes}_9s_linear_infinite]`}
          >
            <Image src={ICON.COMEUS} alt="Come and join us!" />
          </div>
        ))}
      </div>
      <div className="max-w-[785px] text-center mt-[45px] px-6 tablet:px-0 m-auto">
        <TextField color="secondary">
          肝臓研究の
          <br className="tablet:hidden" />
          最先端を知り、
          <br />
          研究に
          <br className="tablet:hidden" />
          参加してみよう！
        </TextField>
        <Paragraph className="mt-[50px] text-start tablet:text-center">
          <span>「脂肪肝なんて、私には関係ない！」そう思っていませんか？</span>
          <br />
          <span>
            実は日本人には、太っておらず飲酒量が少ない場合でも、
            <br />
            脂肪肝（肝臓に過剰な脂肪が蓄積された状態）になる人が一定数いることがわかってきています。
          </span>
          <br />
          <span className="leading-[50px]">
            肝臓は、生命維持に必要な全身の代謝※を担う重要な臓器です。
            <br />
            脂肪肝を放っておくと、長い期間を経て肝臓の機能が損なわれてしまったり、
            <br />
            肝臓ガンを始めとして命にかかわる状態におちいる危険があります。
          </span>
          <br />
          <span className="leading-[32px]">
            脂肪肝のなりやすさには遺伝性をはじめ、大きな個人差があり、
            <br />
            本研究ではその原因の解明を目指しています。
            <br />
            研究を進めるには、さまざまな健康状態、年齢のひとびとの肝臓データが不可欠です。
            <br />
            研究に参加し、医科学研究の最前線に触れてみませんか？
          </span>
          <br />
          ※肝臓の代謝とは、身体を巡るさまざまな物質からエネルギーを合成・貯蔵したり、解毒・分解したりする機能を指します
        </Paragraph>
      </div>
      <div className="mt-[45px] overflow-hidden whitespace-nowrap">
        {arrTextComeUs.map((_, index) => (
          <div
            key={index}
            className={`h-full w-[894px] inline-block mr-10 animate-[slide-in-left-${comeUsTimes}_9s_linear_infinite]`}
          >
            <Image src={ICON.COMEUS} alt="Come and join us!" />
          </div>
        ))}
      </div>
      <div className="text-center max-w-[770px] mt-[45px] px-6 tablet:px-0 m-auto">
        <div className="mt-[45px] border-y-[1px] py-[64px] border-secondary">
          <TextField
            color="primary"
            className="text-[18px] leading-[18px] tracking-[1.8px] uppercase font-semibold font-fredoka-one"
          >
            About this project
          </TextField>
          <TextField color="secondary" className="mt-5">
            みんなの肝臓リサーチとは？
          </TextField>
        </div>
        <div className="mt-[60px] flex flex-col-reverse gap-y-[27px] gap-x-[56px] tablet:flex-row tablet:justify-between relative">
          <div className="flex-1">
            <Paragraph className="text-left">
              みんなの肝臓リサーチは、一般の方々に医科学研究や肝臓研究を身近に感じてもらうことを目的とした、参加型肝臓研究プロジェクトです。
              参加者の皆様には、普段なかなか見ることのない研究室をのぞき、最先端の研究について学んでいただきます。また、実際に研究室が現在行っている研究に参加し、自分の肝臓のエコー画像を見ることができます。集計されたデータは実際の研究に活用されます。
            </Paragraph>
          </div>
          <div className="tablet:w-[368px] tablet:h-[277px] ">
            <Image src={ICON.ORGANIC} alt="organic" />
          </div>
        </div>
        <div className="mt-[60px] px-[29px] py-[42px] tablet:p-10 flex flex-col items-center tablet:flex-row tablet:justify-between bg-[#E8F5F9] w-full">
          <div className="flex flex-col gap-[26px] items-center flex-1">
            <TextField className="text-[22px] font-bold tracking-[2.2px]">
              プロジェクト代表
            </TextField>
            <Image
              width={130}
              height={130}
              src={ICON.AUTHOR}
              style={{
                borderRadius: "100%",
                border: "2px solid #1B9BC3",
              }}
              alt="author"
            />
            <TextField className="text-[22px] font-bold tracking-[2.2px]">
              武部 貴則
            </TextField>
          </div>
          <div className="tablet:w-[52%] text-center tablet:text-start flex flex-col justify-between">
            <div className="font-bold  text-primary leading-[22px] text-xs font-medium">
              <p>東京医科歯科大学 教授</p>
              <p className="leading-[24px]">横浜市立大学</p>
              <p className="leading-[18px]">
                コミュニケーションデザインセンター センター長
              </p>
              <p>シンシナティ小児病院 准教授</p>
              <p>オルガノイドセンター 副センター長</p>
            </div>
            <Paragraph className="text-[13px] text-left font-medium leading-[23px]">
              26歳でiPS細胞を使った｢ミニ肝臓｣を作ることに成功。英国の科学誌『ネイチャー』に論文が掲載される。その後、史上最年少で東京医科歯科大学と横浜市立大学の教授に就任。現在はアメリカを拠点に、再生医療の最先端研究に取り組む。
            </Paragraph>
          </div>
        </div>
        <div className="mt-20 tablet:mt-[160px] border-y-[1px] py-[64px] border-secondary">
          <TextField
            color="primary"
            className="text-[18px] leading-[18px] tracking-[1.8px] uppercase font-semibold font-fredoka-one"
          >
            Previous Research Results
          </TextField>
          <TextField color="secondary" className="mt-5">
            これまでのリサーチ結果
          </TextField>
        </div>
        <div className=" mt-10 tablet:mt-[67px]">
          <TextField color="secondary" className="text-[28px] relative">
            <span className="relative">
              {peopleWithData}人
              <span className="absolute top-[-10px] right-[-5px] text-black text-xs">
                ※
              </span>
            </span>
            <span className="text-black">のうち</span>
            <span className="text-[100px] font-bold font-fredoka-one ">
              {fattyPeople}
            </span>
            人<span className="text-black">が</span>
            <span className="after:content-['...................'] inline-grid after:text-secondary after:text-[28px] after:-translate-y-6 after:tracking-[6px]">
              非肥満型の脂肪肝
            </span>
            <span className="text-black">であった。</span>
          </TextField>
          <Paragraph className="text-xs">
            ※これまでの参加者147人中、問題なくデータ取得できたのは140人
          </Paragraph>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="relative mt-16 flex gap-[26px] flex-col tablet:justify-center tablet:flex-row">
            <div className="relative flex flex-col">
              <ScatterChart coordinates={coordinates} />
              <p className="absolute bottom-[3%] left-[50%] translate-x-[-50%] text-[22px] font-bold text-center tracking-[2.2px]">
                脂肪肝度
              </p>
              <p className="absolute right-[47%] top-[50%] -translate-y-[25%] text-[22px] w-full -rotate-90 font-bold text-center tracking-[2.2px]">
                BMI
              </p>
              <div className="flex gap-5  w-[708px] w-full absolute left-[27.5%] tablet:left-[10%] bottom-[17.5%] ">
                <div className="text-[15px] bg-primary rounded-[1000px] font-bold text-white tracking-[1.5px] w-full h-[25px]">
                  健康な肝臓
                </div>
                <div className="text-[15px] bg-secondary rounded-[1000px] font-bold text-white tracking-[1.5px] w-full h-[25px]">
                  脂肪肝
                </div>
              </div>
            </div>
            <div className="absolute text-xs font-medium top-[14%] tablet:right-[2%] right-[50%] translate-x-[50%] tablet:translate-x-0">
              （2024年2月29日更新）
            </div>
          </div>
        )}

        <TextField
          color="secondary"
          className="mt-[100px] after:content-['.....................................................................................'] after:overflow-hidden inline-grid after:pt-[30px] after:text-secondary after:text-[28px] after:-translate-y-6 after:tracking-[6px]"
        >
          これまでの参加者数
        </TextField>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex tablet:flex-row tablet:justify-between flex-col items-center mt-[49px]">
            <div className="relative">
              {/* <IndicatorChart dataIndicator={dataIndicator} /> */}
              <div className="absolute text-[28px] font-bold bottom-[6%] right-[26%]">
                人
              </div>
            </div>
            <div className="relative flex tablet:flex-row flex-col items-center tablet:gap-16 mt-10 tablet:mt-0">
              <Image
                className="tablet:-rotate-90 "
                src={ICON.ARROWBLUE}
                width={40}
                height={40}
                alt="arrow right"
              />
              <div className="flex items-center gap-3 tablet:block">
                <div className="relative tablet:absolute h-fit tablet:top-5 tablet:left-16 font-bold rounded-[1000px] text-white text-[18px] py-[6px] px-6 bg-primary">
                  あと
                  <div className="w-[19px] h-5 absolute top-[99%] left-[50%] tablet:left-[50%] -translate-x-[50%]">
                    <Image src={ICON.TAILPRIMARY} alt="tail-primary" />
                  </div>
                </div>
                <div className="whitespace-nowrap">
                  <span className="text-[150px] text-secondary font-black font-fredoka-one">
                    {peopleLeft}
                  </span>
                  <span className="font-bold text-[28px]">人</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-36 bg-[#E8F5F9] px-6 tablet:px-0 py-[147px]">
        <div className="max-w-[770px] m-auto">
          <div className="flex flex-col items-center">
            <div className="relative">
              <TextField className="font-fredoka-one uppercase tablet:tracking-[1.86px] tracking-[1.5px] leading-[70px] font-semibold text-[50px] tablet:text-[68px]">
                flow
              </TextField>
              <div className="absolute bottom-[110%] left-[-15%] tablet:top-[-52%] tablet:left-[-27%] tablet:h-[49.5px] h-9 w-[95px] tablet:w-[131px] bg-secondary rounded-[1000px] flex">
                <p className=" font-fredoka-one uppercase text-white text-[15px] tablet:text-[18px] font-bold m-auto">
                  check!
                </p>
                <Image
                  src={ICON.TAILPINK}
                  width={26.125}
                  height={27.5}
                  alt="tail message"
                  className="absolute top-[99%] left-[41%]"
                />
              </div>
            </div>
            <div className="h-[2px] w-full bg-primary"></div>
            <TextField
              className="text-[22px] tracking-[2.2px] mt-[25px]"
              color="black"
            >
              体験の流れ
            </TextField>
          </div>
          <div className="mt-[70px] flex flex-col gap-10">
            <div className="flex tablet:flex-row flex-col gap-y-[30px] items-center">
              <div className="flex items-center flex-col gap-8 flex-1">
                <div className="flex items-center font-fredoka-one gap-4">
                  <TextField className=" text-[18px] uppercase py-[7px] px-7 bg-white rounded-3xl">
                    step
                  </TextField>
                  <span className="font-black text-primary text-[80px] ">
                    1
                  </span>
                </div>
                <div>
                  <TextField color="secondary">研究を知る</TextField>
                </div>
                <div className="hidden tablet:block">
                  <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                    研究室を案内し、武部ラボが行っている
                    <br />
                    最新の研究をご紹介いたします。
                  </Paragraph>
                </div>
              </div>
              <div className="w-[278px] tablet:w-[388px] tablet:h-[388px]">
                <Image
                  src={ICON.RESEARCH_1}
                  alt="research"
                  style={{ borderRadius: "100%" }}
                />
              </div>
              <div className="tablet:hidden">
                <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                  研究室を案内し、武部ラボが行っている
                  <br />
                  最新の研究をご紹介いたします。
                </Paragraph>
              </div>
            </div>
            <div className="flex tablet:flex-row gap-y-[30px] flex-col-reverse items-center">
              <div className="flex flex-col gap-y-[30px] tablet:contents">
                <div className="relative w-[278px] tablet:w-[388px] tablet:h-[388px]">
                  <Image
                    src={ICON.RESEARCH_2}
                    alt="research"
                    style={{ borderRadius: "100%" }}
                  />
                  <div className="absolute top-0 tablet:left-0 right-0 w-[80px] tablet:w-[100px] h-[80px] tablet:h-[100px] rounded-full text-[14px] tablet:text-[15px] font-bold tracking-[1.5px] text-white bg-secondary flex">
                    <p className="m-auto">1時間程度</p>
                  </div>
                </div>
                <div className="tablet:hidden">
                  <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                    現在研究室が実施している研究に
                    <br />
                    ご参加いただきます。
                  </Paragraph>
                </div>
              </div>
              <div className="flex items-center flex-col gap-8 flex-1">
                <div className="flex items-center font-fredoka-one gap-4">
                  <TextField className=" text-[18px] uppercase py-[7px] px-7 bg-white rounded-3xl">
                    step
                  </TextField>
                  <span className="font-black text-primary text-[80px] ">
                    2
                  </span>
                </div>
                <div>
                  <TextField color="secondary">研究に参加する</TextField>
                </div>
                <div className="hidden tablet:block">
                  <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                    現在研究室が実施している研究に
                    <br />
                    ご参加いただきます。
                  </Paragraph>
                </div>
              </div>
            </div>
            <div className="flex flex-col tablet:flex-row gap-[50px] bg-white py-[49px] px-[33px] tablet:px-[60px] mt-6">
              <div className="flex-1">
                <TextField className="text-[15px]">実施内容</TextField>
                <Paragraph className="text-[13px] leading-[23px] mt-8">
                  <span className="font-bold">・身体測定</span>
                  <br />
                  身長と体重から肥満度を計算します。 <br />
                  <span className="font-bold">・エコー測定</span>
                  <br />
                  お腹に超音波をあてて、肝臓の脂肪を調べます。 <br />
                  <span className="font-bold">・唾液調査</span>
                  <br />
                  交感神経の活性化検査と遺伝子調査のため、唾液を採取します。
                  <br />
                  <span className="font-bold">・自律神経検査</span>
                  <br />
                  センサーを指につけて心拍変動を測定します。 <br />
                  <span className="font-bold">・アンケート</span>
                  <br />
                  年代や性別、食生活などに関するアンケートに回答します。
                </Paragraph>
                <Paragraph className="text-[12px] leading-[22px] mt-[15px]">
                  ※研究への参加は任意です。ご参加いただける方は同意書へのご記入が必要となります。
                </Paragraph>
              </div>
              <div className="flex-1">
                <TextField className="text-[15px]">測定結果について</TextField>
                <Paragraph className="text-[13px] leading-[23px] mt-8">
                  測定した結果はご自身で確認することができま
                  <br />
                  す。以下の測定項目は印刷してお渡しすることも
                  <br />
                  可能ですのでスタッフにご相談ください。
                  <br />
                  <span className="font-bold">お渡しできるデータ</span>
                  <br />
                  ・心拍数データ <br />
                  ・体組成データ
                  <br /> ・肝臓のエコー写真
                </Paragraph>
                <Paragraph className="text-[12px] leading-[22px] mt-[15px]">
                  ※研究を目的とした調査のため、医療機関で行うような脂肪肝や肝臓病等の診断は行っておりません。データについての個別のご質問もお控えください。
                </Paragraph>
              </div>
            </div>
            <div className="flex tablet:flex-row flex-col gap-y-[30px] items-center mt-10">
              <div className="flex items-center flex-col gap-8 flex-1">
                <div className="flex items-center font-fredoka-one gap-4">
                  <TextField className="text-[18px] uppercase py-[7px] px-7 bg-white rounded-3xl">
                    step
                  </TextField>
                  <span className="font-black text-primary text-[80px] ">
                    3
                  </span>
                </div>
                <div>
                  <TextField color="secondary">研究者とお話する</TextField>
                </div>
                <div className="hidden tablet:block">
                  <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                    研究者に気になることを質問したり、 <br />
                    体験の感想や研究についてのアイデアを <br />
                    話したりすることができます。
                  </Paragraph>
                </div>
              </div>
              <div className="relative w-[278px] tablet:w-[388px] tablet:h-[388px]">
                <Image
                  src={ICON.RESEARCH_3}
                  alt="research"
                  style={{ borderRadius: "100%" }}
                />
                <div className="absolute top-0 right-0 w-[80px] tablet:w-[100px] h-[80px] tablet:h-[100px] rounded-full text-[14px] tablet:text-[15px] font-bold tracking-[1.5px] text-white bg-secondary flex">
                  <p className="m-auto">1時間程度</p>
                </div>
              </div>
              <div className="tablet:hidden">
                <Paragraph className="leading-[30px] tracking-[0.45px] text-center text-[15px]">
                  研究者に気になることを質問したり、 <br />
                  体験の感想や研究についてのアイデアを <br />
                  話したりすることができます。
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[120px] px-[23px] tablet:px-0 max-w-[770px] m-auto flex flex-col items-center">
        <TextField
          color="secondary"
          className="text-center after:content-['.....................................................................................'] after:overflow-hidden inline-grid after:pt-[30px] after:text-secondary after:text-[28px] after:-translate-y-6 after:tracking-[6px]"
        >
          こんな方におすすめ！
        </TextField>
        <div className="relative mt-[180px] tablet:mt-[50px] flex gap-[10.5px] tablet:gap-[43px]">
          <div className="bg-secondary w-[158px] h-[158px] tablet:w-[180px] tablet:h-[180px] rounded-full flex justify-center items-center text-center absolute tablet:relative tablet:bottom-0 tablet:left-0 bottom-[92%] left-[26%]">
            <TextField color="white" className="tracking-[1.5px] text-[15px]">
              医療の最先端に
              <br />
              興味のある方
            </TextField>
          </div>
          <div className="bg-secondary w-[158px] h-[158px] tablet:w-[180px] tablet:h-[180px] rounded-full flex justify-center items-center text-center">
            <TextField color="white" className="tracking-[1.5px] text-[15px]">
              未来館の裏側を <br />
              見たい方
            </TextField>
          </div>
          <div className="bg-secondary w-[158px] h-[158px] tablet:w-[180px] tablet:h-[180px] rounded-full flex justify-center items-center text-center">
            <TextField color="white" className="tracking-[1.5px] text-[15px]">
              BMIの高い方から <br />
              低い方まで！
            </TextField>
          </div>
        </div>
        <div className="w-full">
          <TextField className="tracking-[2.8px] text-center text-[28px] mt-[80px]">
            実施概要
          </TextField>
          <div className="mt-[30px] w-full flex flex-col gap-10">
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                日程
              </TextField>
              <Paragraph>
                開催日時は申し込みフォームよりご確認ください。（各回90分）
              </Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                実施場所
              </TextField>
              <Paragraph>
                日本科学未来館 4階
                「ヒューマン・オルガノイド」プロジェクト研究室
              </Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                対象
              </TextField>
              <Paragraph>13歳〜80歳</Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                参加費
              </TextField>

              <Paragraph>入館料のみ</Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                注意事項
              </TextField>
              <Paragraph className="leading-[30px]">
                ・研究への参加にあたり、18歳未満の方は、研究の説明と同意書の記入に関して、保護者の方の同席が必要です。
                <br />
                ・測定の都合上、ペースメーカー等の医用電気機器を装着された方はご参加いただけません。
                <br />
                ・誠に申し訳ありませんが、運営の都合上、未就学児のお子様を連れてのご参加はお断りしております。
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FEEFF0] mt-[139px] py-[128px] px-[25px] tablet:px-0 text-center">
        <div className=" max-w-[770px] m-auto">
          <div className="flex flex-col items-center border-b-2 border-secondary">
            <div className="relative ">
              <TextField
                color="secondary"
                className="font-fredoka-one uppercase tracking-[1.5px]  tablet:tracking-[1.86px] leading-[70px] font-semibold text-[50px] tablet:text-[68px]"
              >
                Join the Project
              </TextField>
              <div className="absolute bottom-[105%] tablet:bottom-[95%] flex tablet:left-[-10%] rounded-[1000px] uppercase text-white text-[15px] tablet:text-[18px] w-[95px] h-[36px] tablet:w-[130.6px] tablet:h-[49.5px] bg-primary">
                <p className="m-auto font-fredoka-one font-bold tracking-[0.45px]">
                  check!
                </p>
                <div className="w-[19px] h-5 absolute top-[99%] left-[50%] tablet:left-[50%] -translate-x-[50%]">
                  <Image src={ICON.TAILPRIMARY} alt="tail-primary" />
                </div>
              </div>
            </div>
          </div>
          <TextField
            color="black"
            className="text-[22px] text-center mt-[26px] tracking-[2.2px]"
          >
            申し込む
          </TextField>
          <div className="mt-10 tablet:w-full hidden tablet:block bg-[#FEFEFE] rounded-lg none-scrollbar ">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2DPfaMuJF1Ah6p4OmZMlGJsXZhu0PzHndncqowYl68uqIwf75chBkF6OwzFU7SY7U6ejDx_b7M?gv=true"
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder="0"
            ></iframe>
          </div>
          <div className="tablet:hidden mt-[37px] bg-white w-full h-[470px] rounded-lg">
            CALENDAR
          </div>
        </div>
      </div>
      <div className="mt-[80px] mx-[23px] max-w-[770px] tablet:m-auto">
        <div>
          <TextField className="tracking-[2.8px] text-[28px] mt-[80px] text-center">
            実施概要
          </TextField>
          <div className="mt-[30px] w-full flex flex-col gap-10">
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                2024/2/28
              </TextField>
              <Paragraph>3月分のリサーチの予約を開始しました</Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                2024/2/24
              </TextField>
              <Paragraph>リサーチの人数が147人を突破しました！ </Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                2024/1/31
              </TextField>
              <Paragraph>2月分のリサーチの予約を開始しました</Paragraph>
            </div>
          </div>
        </div>
        <div className="text-center mt-[60px]">
          <TextField className="bg-primary inline-flex gap-8 items-center justify-center w-full tablet:w-fit py-[22px] tablet:px-[60px] rounded-[200px] text-white tracking-[1.5px] text-[15px]">
            お知らせをもっとみる
            <Image
              src={ICON.RECTARROW}
              width={8.3}
              height={8.3}
              alt="reactangle arrow"
            />
          </TextField>
        </div>
        <div className="mt-[95px]">
          <TextField className="tracking-[2.8px] text-[28px] mt-[80px] text-center">
            メンバー一覧
          </TextField>
          <div className="mt-[30px] w-full flex flex-col gap-10">
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                プロジェクト代表
              </TextField>
              <Paragraph className="mt-5">
                <span className="font-bold">武部 貴則</span>
                <br />
                大阪大学大学院医学系研究科　器官システム創生学／東京医科歯科大学
                統合研究機構 創生医学コンソーシアム
              </Paragraph>
            </div>
            <div>
              <TextField className="border-b-2 border-primary pb-[10px] text-[15px]">
                プロジェクトメンバー
              </TextField>
              <div className="leading-[30px] text-[15px] font-medium mt-5 flex flex-col gap-8">
                <div>
                  <span className="font-bold">大阪大学</span>
                  <br />
                  西村 俊哉（大阪大学大学院医学系研究科　器官システム創生学）
                </div>
                <div>
                  <span className="font-bold">東京医科歯科大学</span>
                  <br />
                  関谷 佐智子（東京医科歯科大学 統合研究機構
                  創生医学コンソーシアム）
                  <br />
                  松島 麻悠子（東京医科歯科大学 統合研究機構
                  創生医学コンソーシアム）
                  <br />
                  井上 美穂（東京医科歯科大学 医学部医学科）
                  <br />
                  坂本 慶太（東京医科歯科大学 医学部医学科）
                </div>
                <div>
                  <span className="font-bold">
                    横浜市立大学先端医科学研究センター　コミュニケーション・デザイン・センター
                  </span>
                  <br />
                  西井 正造（横浜市立大学先端医科学研究センター
                  コミュニケーション・デザイン・センター）
                  <br />
                  藤森 晶子（横浜市立大学先端医科学研究センター
                  コミュニケーション・デザイン・センター）
                  <br />
                  小高 明日香（横浜市立大学先端医科学研究センター
                  コミュニケーション・デザイン・センター）
                </div>
                <div>
                  <span className="font-bold">
                    大阪大学 ヒューマン・メタバース疾患研究拠点
                  </span>
                  <br />
                  根本 孝裕（大阪大学 ヒューマン・メタバース疾患研究拠点）
                  <br />
                  Saber Al-sobaihi（大阪大学
                  ヒューマン・メタバース疾患研究拠点）
                  <br />
                  Rodolfo Allendes（大阪大学
                  ヒューマン・メタバース疾患研究拠点）
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[95px] border-2 border-secondary px-[16px] py-[39px] tablet:p-[38px]">
          <TextField
            color="secondary"
            className="text-center after:content-['.....................................................................................'] after:overflow-hidden inline-grid after:pt-[30px] after:text-secondary after:text-[28px] after:-translate-y-6 after:tracking-[6px]"
          >
            主催
          </TextField>
          <TextField className="mt-[30px] text-secondary text-[18px] tracking-[1.8px]">
            みんなの肝臓リサーチは、
          </TextField>
          <Paragraph className="flex flex-col gap-5 tracking-[1.5px] mt-[22px]">
            <span>日本科学未来館 武部研究室</span>
            <span>
              大阪大学大学院医学系研究科 器官システム創生学 武部研究室
            </span>
            <span>
              東京医科歯科大学 統合研究機構 創生医学コンソーシアム 武部研究室
            </span>
            <span className="leading-[25px]">
              横浜市立大学 先端医科学研究センター
              <br />
              コミュニケーション・デザイン・センター
            </span>
          </Paragraph>
          <TextField className="mt-[30px] text-secondary text-[18px] tracking-[1.8px]">
            の研究プロジェクトの一環で、企画運営をしております。
          </TextField>
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
}

export const getSheet1 = async (): Promise<any> => {
  const res = await fetch("http://localhost:3000/api/sheet");
  return {
    hung: "dep trai",
    sheetData1: res,
  };
};

const spreadsheetId = "1Tnx7fCcxre5Z3VsmOcPwAtcP39jTosH9OVCvDbkt9Hg";
const sheetName = "Sheet1";
