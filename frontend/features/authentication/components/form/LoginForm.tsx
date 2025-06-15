"use client";

import Input from "@/components/Input";
import LabelledInput from "@/components/LabelledInput";
import PasswordInput from "@/components/PasswordInput";
import { SmallRightArrowIcon } from "@/features/landing/components/Svgs";
import React, { useActionState, useCallback } from "react";
import { login } from "../../lib/actions/login";
import SpinnerSvg from "@/components/SpinnerSvg";

type LoginState = {
  formData: { [k: string]: FormDataEntryValue };
  errors: {
    email?: string[];
    password?: string[];
  };
};

export default function LoginForm() {
  const [loginData, loginAction, isPending] = useActionState(
    login,
    {} as LoginState
  );

  const getError = useCallback(
    (field: "email" | "password"): string | null => {
      if (
        loginData?.errors &&
        loginData.errors[field] &&
        loginData.errors[field].length > 0
      ) {
        return loginData.errors[field][0] as unknown as string;
      }
      return null;
    },
    [loginData]
  );

  return (
    <form action={loginAction} className="w-full flex flex-col gap-[22px]">
      <LabelledInput
        label="Email address"
        inputWidget={
          <Input
            placeholder="Enter email address"
            name={"email"}
            error={getError("email")}
            defaultValue={loginData?.formData?.["email"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Password"
        inputWidget={
          <PasswordInput
            name="password"
            placeholder="Enter password"
            error={getError("password")}
            defaultValue={loginData?.formData?.["password"]?.toString()}
            required
          />
        }
      />
      <button
        type="submit"
        className="w-full cursor-pointer hover:brightness-[90%] flex items-center justify-center gap-[3px] py-[6px] px-[12px] rounded-[8px] bg-[linear-gradient(to_bottom,_#212126cc_0%,_#000000cc_100%)]"
      >
        {isPending ? (
          <SpinnerSvg size={17} />
        ) : (
          <>
            <div className="text-[13px] text-white">Continue</div>
            <SmallRightArrowIcon />
          </>
        )}
      </button>
    </form>
  );
}
