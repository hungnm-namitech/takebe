import ICON from "@/app/assets";
import Image from "next/image";
import React from "react";
import { TextField } from "../Text";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="w-full h-full h-footer bg-primary tablet:px-[132px]  py-[64px] flex flex-col gap-y-[42px] tablet:block items-center">
      <div className=" flex flex-col gap-y-[42px] tablet:flex-row  tablet:justify-between items-center">
        <div className="w-[143.5px] h-[139px] tablet:w-[179px] tablet:h-[173.3px]">
          <Image src={ICON.INTRO} alt="intro" />
        </div>
        <div className="text-white font-bold tablet:translate-y-[50%]">
          <div className="flex flex-col items-center text-center gap-y-10 tablet:flex-row tablet:gap-[47px]">
            <p className="flex tablet:gap-[26px] gap-y-5 flex-col tablet:flex-row text-[18px] leading-6">
              <Link href="/privacy" className="border-b-[1px] pb-1">
                プライバシーポリシー
              </Link>
              <span className="border-b-[1px] pb-1">お問い合わせ</span>
            </p>
            <Image src={ICON.LOGO_X} width={28} height={28} alt="logo X" />
          </div>
          <TextField
            color="white"
            className="text-[14px] leading-[14px] tracking-[0.07px] mt-[30px] hidden tablet:block "
          >
            Copyright © 武部ラボ All Rights Reserved.
          </TextField>
        </div>
      </div>
      <TextField
        color="white"
        className="text-[13px] leading-[14px] tracking-[0.65px] tablet:hidden"
      >
        Copyright © 武部ラボ All Rights Reserved.
      </TextField>
    </div>
  );
};

export default Footer;
