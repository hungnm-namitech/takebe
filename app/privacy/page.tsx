"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ICON from "../assets";

type Props = {};

const Privacy = (props: Props) => {
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
      <p className="font-bold tablet:mx-0 text-[24px] tablet:text-[30px] tracking-[3px] leading-10 text-primary">
        プライバシーポリシー
      </p>
      <div className="tablet:max-w-[827px] flex flex-col gap-10 text-[15px] text-left tablet:text-center font-normal leading-10 tracking-[1.5px]">
        <div className="leading-[30px] text-[15px] font-medium mt-5 flex flex-col gap-8">
          <div>
            <span className="font-bold">個人情報保護について</span>
            <br />
            日本科学未来館 ヒューマン・オルガノイド
            プロジェクト（以下「本プロジェクト」といいます。）は、個人情報保護の重要性を認識し、以下の方針に基づき、その適切な管理に努めます。
            <br />
            <div className="text-left pl-9 tablet:pl-0 ">
              <div>
                <p className="font-semibold">1. 個人情報の取得・保有について</p>
                <p>
                  （1）本プロジェクトでは、偽りその他不正な手段により個人情報を取得しません。
                  <br />
                  （2）本プロジェクトでは、業務の遂行に必要な場合に限り個人情報を保有し、かつ、その利用目的を特定します｡
                  <br />
                  （3）本プロジェクトでは、特定された利用目的の達成に必要な範囲を超えて、個人情報を保有しません。
                  <br />
                  （4）本プロジェクトでは、特定された利用目的を変更する場合、変更前の利用目的と相当の関連性を有すると認められる範囲を超えて行いません｡
                </p>
              </div>
              <div>
                <p className="font-semibold">2. 個人情報の利用について</p>
                <p>
                  本プロジェクトでは、法令に基づく場合を除き、事前に本人の同意を得ることなく、利用目的以外の目的のために個人情報を利用し、又は提供しません。
                </p>
              </div>
              <div>
                <p className="font-semibold">3. 個人情報の管理について</p>
                <p>
                  本プロジェクトでは、個人情報の漏えい、紛失又は改ざんの防止その他の個人情報の適切な管理のために必要な対策を講じます。
                </p>
              </div>
              <div>
                <p className="font-semibold">4. 個人情報の開示等について</p>
                <p>
                  本プロジェクトでは、個人情報について開示、訂正、利用停止の請求があった場合、本学規程の定めるところにより、速やかに対応します。
                </p>
              </div>
              <div>
                <p className="font-semibold">5. 個人情報の廃棄</p>
                <p>
                  本プロジェクトでは、不要になった個人情報については、安全かつ適切な方法により廃棄します。
                </p>
              </div>
            </div>
          </div>
          <div>
            <span className="font-bold">利用者情報の収集について</span>
            <br />
            当サイトで個人情報の収集を行う場合（アンケートの実施や資料請求時等）、そのページに利用目的を明示いたします。その目的以外には一切利用いたしません。
            なお、業者委託先等に情報を提供することがありますが、その場合にも機密保持契約を結び適切な情報の管理と利用をいたします。
          </div>
          <div>
            <span className="font-bold">収集した情報の利用・範囲</span>
            <br />
            収集した個人情報を、その目的範囲を超えて利用することはありません。なお、事前の了承・同意がある場合や、法令により必要とされる場合、公共の利益のために必要とされる場合は、情報を提供することがあります。
          </div>
          <div>
            <span className="font-bold">
              Googleアナリティクス等の利用について
            </span>
            <br />
            当サイトでは、Google社の各種サービスを利用しています。主には分析ツール（Googleアナリティクス）や予約機能の埋め込みを行っています。
            当サイトを閲覧した際に、お使いのウェブブラウザからGoogleに特定の情報が自動的に送信されます。
            このような情報には、アクセスしたページの URL やユーザーの IP
            アドレスなどがあります。また、Google がお使いのブラウザに Cookie
            を設定したり、既存の Cookie を読み取ったりする場合もあります。
            個々の目的に沿ったデータの処理方法に関して詳しくは、Google
            のプライバシーポリシーをご覧ください。
            本ポリシーに関するお問い合わせは下記にお願いいたします。
            Email：minnanokanzo@takebelab.com 武部研究室
            ヒューマン・オルガノイド プロジェクト担当
          </div>
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

export default Privacy;
