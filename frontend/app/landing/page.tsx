import Navbar from "@/features/landing/components/Navbar";
import React from "react";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import Link from "next/link";
import Button from "@/components/Button";
import ProductFeature from "@/features/landing/components/ProductFeature";
import useProductFeatures from "@/features/landing/hooks/useProductFeatures";
import Footer from "@/features/landing/components/Footer";
import ScrollArea from "@/components/ScrollArea";
import useUserReviews from "@/features/landing/hooks/useUserReviews";
import UserReview from "@/features/landing/components/UserReview";
import useFAQ from "@/features/landing/hooks/useFAQ";
import FAQuesion from "@/features/landing/components/FAQuesion";
import FadeInWrapper from "@/components/FadeInWrapper";

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <FadeInWrapper>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
      </FadeInWrapper>
      <Footer />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className="xl:gap-[110px] xl:pt-0 xl:pr-0 xl:pl-[165px] xl:pb-[60px] md:px-0 md:py-[60px] sm:px-0 sm:pt-[33px] sm:pb-[10px]   w-full flex xl:flex-row flex-col justify-center items-center">
      <div className="flex flex-col flex-1 items-center pt-[33px] md:pt-0  md:items-start justify-center">
        <div className="w-full md:flex hidden flex-col justify-start">
          <p className="font-bold text-[56px] tracking-[-1px] leading-[60px] text-blue-600">
            For Teamwork
          </p>
          <p className="font-bold text-[56px] tracking-[-1px] leading-[60px] text-blue-600">
            & Collaboration
          </p>
        </div>
        <div className="w-full md:hidden flex flex-col items-center justify-center">
          <p className="font-bold text-[40px] text-center tracking-[-1px] leading-[45px] text-blue-600">
            For Teamwork &<br />
            Collaboration
          </p>
        </div>
        <p className="font-normal md:flex hidden  text-blue-600 pt-[14px] max-w-[420px] leading-[28px] tracking-[0px]">
          Bring Your Team Together—Face to Face, From Anywhere.
        </p>
        <p className="font-normal md:hidden text-blue-600 pt-[14px] text-center leading-[28px]">
          Bring Your Team Together-Face to Face,
          <br />
          From Anywhere
        </p>
        <div className="gap-[20px] w-full flex md:flex-row flex-col justify-start pt-[40px] items-center">
          <div className="gap-[20px] flex">
            <Link href="/login/" className="">
              <PrimaryButton>Log in</PrimaryButton>
            </Link>
            <Link href="/signup/" className="">
              <Button>Sign up</Button>
            </Link>
          </div>
          <p className="md:text-[14px] text-[13px]  max-w-[240px] text-blue-600">
            5,000 people are already using our tool on a daily basis!
          </p>
        </div>
      </div>
      <div className="flex xl:flex-1 md:w-full items-center justify-center">
        <Image
          width={0}
          height={0}
          src="/landing1.png"
          alt="Preview Image"
          className="w-full"
          unoptimized
          priority
        />
      </div>
    </div>
  );
};

const Section2 = () => {
  const productFeatures = useProductFeatures();

  return (
    <div className="w-full xl:px-[165px] xl:py-[60px] md:pt-0 flex xl:flex-row xl:justify-evenly xl:gap-0 xl:items-center gap-[31px] flex-col justify-start items-center pt-[60px]">
      {productFeatures.map((feature, idx) => (
        <ProductFeature
          key={idx}
          icon={feature.icon}
          title={feature.title}
          content={feature.content}
        />
      ))}
    </div>
  );
};

const Section3 = () => {
  return (
    <div className="flex xl:flex-row md:w-full xl:justify-center xl:items-center md:py-[60px] md:px-[165px] px-2 py-[40px] xl:gap-[110px] flex-col justify-start items-center gap-[44px]">
      <div className="flex flex-1 flex-col md:w-full w-[min(100vw,370px)] xl:items-start items-center gap-[16px]">
        <p className="font-bold text-[24px] tracking-[-0.1px] leading-[32px] text-blue-600">
          Create rooms within seconds
        </p>
        <p className="font-normal text-[16px] tracking-[0.1px] leading-[24px] text-blue-600">
          Hit “Open Room” to start instantly. Send the link to your
          <br className="md:block hidden" /> friends or team, and dive into the
          meeting — no hassle.
        </p>
      </div>
      <div className="flex-1">
        <Image
          width={0}
          height={0}
          src="/landing2.png"
          alt="Preview Image"
          className="w-full"
          unoptimized
        />
      </div>
    </div>
  );
};

const Section4 = () => {
  return (
    <div className="flex xl:flex-row md:w-full xl:justify-center xl:items-center md:py-[60px] md:pr-[65px] pr-2 py-[40px] xl:gap-[110px] flex-col-reverse justify-start items-center gap-[44px]">
      <div className="flex-1">
        <Image
          width={0}
          height={0}
          src="/landing3.png"
          alt="Preview Image"
          className="w-full"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col md:w-full w-[min(100vw,370px)] xl:items-start items-center gap-[16px]">
        <p className="font-bold text-[24px] tracking-[-0.1px] leading-[32px] text-blue-600">
          Customize theme
        </p>
        <p className="font-normal text-[16px] tracking-[0.1px] leading-[24px] text-blue-600">
          Hit the theme toggle at the top to instantly switch the{" "}
          <br className="md:block hidden" />
          website&apos;s entire appearance.
        </p>
      </div>
    </div>
  );
};

const Section5 = () => {
  const userReviews = useUserReviews();

  return (
    <ScrollArea
      x={true}
      y={false}
      className="px-[30px] flex items-center justify-center-safe gap-[20px] w-[100vw]"
    >
      {userReviews.map((review, idx) => (
        <UserReview
          key={idx}
          content={review.content}
          name={review.name}
          surname={review.surname}
          icon_src={review.icon_src}
        />
      ))}
    </ScrollArea>
  );
};

const Section6 = () => {
  const questions = useFAQ();

  return (
    <div className="pt-[120px] w-full flex flex-col justify-start items-center">
      <div className="font-bold md:text-[40px] text-center leading-[48px] tracking-[-0.5px] text-[32px] pb-[32px] text-blue-600">
        Frequently Asked Questions
      </div>
      <div className="w-[min(640px,90%)]">
        {questions.map((question, idx) => (
          <FAQuesion
            key={idx}
            question={question.question}
            answer={question.answer}
          />
        ))}
      </div>
    </div>
  );
};

const Section7 = () => {
  return (
    <div className="pb-[60px] pt-[120px] w-full flex-col flex justify-center items-center">
      <div className="text-[16px] leading-[24px] tracking-[0.1px] text-center text-blue-600">
        Meetio
      </div>
      <div className="font-bold mt-[12px] md:text-[40px] text-center leading-[48px] tracking-[-0.5px] text-[32px] pb-[32px] text-blue-600">
        Don&apos;t miss out — <br /> sign up now!
      </div>
      <Link href="/signup/">
        <PrimaryButton className="mt-[10px]">Sign up</PrimaryButton>
      </Link>
    </div>
  );
};
