import React from "react";
import Title from "./Title";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { Link } from "react-router-dom";

function OurPolicy() {
  return (
    <div className="w-[100vw] min-h-[70vh] flex items-center justify-start flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px]">

      {/* TITLE */}
      <div className="w-full text-center mt-[70px]">
        <Title text1={"OUR"} text2={"POLICY"} />

        <p className="w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">
          Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
        </p>
      </div>

      {/* POLICY CARDS */}
      <div className="w-full flex items-center justify-center flex-wrap gap-[50px] px-[20px]">

        {/* EXCHANGE POLICY */}
        <Link
          to="/exchange-policy"
          className="w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[12px] p-[20px] rounded-xl bg-[#51808030] hover:bg-[#51808070] transition cursor-pointer"
        >
          <RiExchangeFundsLine className="text-[#90b9ff] text-[60px]" />

          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Easy Exchange Policy
          </p>

          <p className="md:text-[16px] text-[13px] text-[aliceblue] text-center">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </Link>

        {/* RETURN POLICY */}
        <Link
          to="/return-policy"
          className="w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[12px] p-[20px] rounded-xl bg-[#51808030] hover:bg-[#51808070] transition cursor-pointer"
        >
          <TbRosetteDiscountCheckFilled className="text-[#90b9ff] text-[60px]" />

          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            7 Days Return Policy
          </p>

          <p className="md:text-[16px] text-[13px] text-[aliceblue] text-center">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </Link>

        {/* SUPPORT */}
        <Link
          to="/support"
          className="w-[350px] max-w-[90%] flex items-center justify-center flex-col gap-[12px] p-[20px] rounded-xl bg-[#51808030] hover:bg-[#51808070] transition cursor-pointer"
        >
          <BiSupport className="text-[#90b9ff] text-[60px]" />

          <p className="font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]">
            Best Customer Support
          </p>

          <p className="md:text-[16px] text-[13px] text-[aliceblue] text-center">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </Link>

      </div>
    </div>
  );
}

export default OurPolicy;