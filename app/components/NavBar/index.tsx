import ICON from "@/app/assets";
import Image from "next/image";
import React from "react";
import { TextField } from "../Text";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className="w-full px-2 tablet:px-10 h-header bg-secondary flex justify-between items-center font-zen-maru-gothic">
      <TextField
        color="white"
        className="text-[15px] tracking-[0.6px] tablet:text-xl "
      >
        <span className="hidden tablet:inline-block">みんなの肝臓リサーチ</span>
        <span className="tablet:hidden">
          みんなの <br />
          肝臓リサーチ
        </span>
      </TextField>
      <p className="text-white text-xl font-bold leading-[0.8px]"></p>
      <div className="flex gap-[31px] items-center">
        <button className="text-secondary font-bold py-[6px] px-10 bg-white rounded-3xl">
          申し込む
        </button>
        <Image src={ICON.MENU} height={25} width={26} alt="menu" />
      </div>
    </div>
  );
};

export default NavBar;
