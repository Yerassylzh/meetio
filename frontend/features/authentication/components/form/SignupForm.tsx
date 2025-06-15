import Input from "@/components/Input";
import LabelledInput from "@/components/LabelledInput";
import PasswordInput from "@/components/PasswordInput";
import { SmallRightArrowIcon } from "@/features/landing/components/Svgs";
import React, { useActionState, useCallback } from "react";
import { signup } from "@/features/authentication/lib/actions/signup";
import SpinnerSvg from "@/components/SpinnerSvg";

type SignupState = {
  formData: { [k: string]: FormDataEntryValue };
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
};

export default function LoginForm() {
  const [signupData, signupAction, isPending] = useActionState(
    signup,
    {} as SignupState
  );

  const getError = useCallback(
    (field: "name" | "email" | "password"): string | null => {
      if (
        signupData?.errors &&
        signupData.errors[field] &&
        signupData.errors[field].length > 0
      ) {
        return signupData.errors[field][0] as unknown as string;
      }
      return null;
    },
    [signupData]
  );

  return (
    <form action={signupAction} className="w-full flex flex-col gap-[22px]">
      <LabelledInput
        label="Name"
        inputWidget={
          <Input
            name="name"
            placeholder="Enter your name"
            error={getError("name")}
            defaultValue={signupData?.formData?.["name"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Email address"
        inputWidget={
          <Input
            name="email"
            placeholder="Enter your email address"
            error={getError("email")}
            defaultValue={signupData?.formData?.["email"]?.toString()}
            required
          />
        }
      />
      <LabelledInput
        label="Password"
        inputWidget={
          <PasswordInput
            name="password"
            placeholder="Enter your password"
            error={getError("password")}
            defaultValue={signupData?.formData?.["password"]?.toString()}
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
