import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

export type ButtonType = "primary" | "success" | "warn" | "danger" | "info";

export type ButtonSize = "small" | "middle" | "large";

export interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "prefix"> {
  children?: React.ReactNode;
  type?: ButtonType;
  size?: ButtonSize;
  rounded?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export default function Button({
  children,
  type,
  size,
  rounded,
  htmlType,
  prefix,
  suffix,
  className,
  ...rest
}: Props) {
  const hasIcon = !!prefix || !!suffix;
  return (
    <button
      type={htmlType}
      className={clsx(
        "text-sm text-gray-800 transition-all hover:shadow-lg",
        rounded && "rounded-md",
        {
          "bg-gray-100": !type,
          "bg-blue-500 text-white hover:shadow-blue-200": type === "primary",
          "bg-green-500 text-white hover:shadow-green-200": type === "success",
          "bg-yellow-500 text-white hover:shadow-yellow-200": type === "warn",
          "bg-red-500 text-white hover:shadow-red-200": type === "danger",
          "bg-gray-500 text-white hover:shadow-gray-200": type === "info",
        },
        {
          "px-4 leading-8": !size || size === "middle",
          "px-2 leading-6": size === "small",
          "px-6 leading-10 text-lg": size === "large",
        },
        {
          "flex items-center": hasIcon,
        },
        className
      )}
      {...rest}
    >
      {prefix && prefix}
      <span
        className={clsx({
          "px-1": hasIcon,
        })}
      >
        {children}
      </span>
      {suffix && suffix}
    </button>
  );
}
