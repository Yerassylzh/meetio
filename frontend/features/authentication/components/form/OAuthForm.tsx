"use client";

import IconicButton from "@/components/IconicButton";
import { GithubIcon, GoogleIcon } from "@/features/landing/components/Svgs";
import React from "react";
import { login as loginGithub } from "../../lib/actions/authGithub";
import { login as loginGoogle } from "../../lib/actions/authGoogle";

export default function OAuthForm() {
  return (
    <div className="w-full pt-[22px] flex md:flex-row flex-col gap-[10px]">
      <div className="flex-1" onClick={() => loginGithub()}>
        <IconicButton icon={<GithubIcon />} text="Github" />
      </div>
      <div className="flex-1" onClick={() => loginGoogle()}>
        <IconicButton icon={<GoogleIcon />} text="Google" />
      </div>
    </div>
  );
}
