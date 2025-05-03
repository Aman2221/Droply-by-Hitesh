"use client";
import React, { ReactNode } from "react";
import type { ThemeProviderProps } from "next-themes";
import { ImageKitProvider } from "imagekitio-next";
import { HeroUIProvider } from "@heroui/react";
import { ClerkProvider } from "@clerk/nextjs";
export interface ProviderProps {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

const authenticator = async () => {
  try {
    const response = await fetch("api/imagekit-auth");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Authentication Error", error);
    throw error;
  }
};

const Provider = ({ children, themeProps }: ProviderProps) => {
  return (
    <ClerkProvider>
      <ImageKitProvider
        authenticator={authenticator}
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      >
        <HeroUIProvider>{children}</HeroUIProvider>
      </ImageKitProvider>
    </ClerkProvider>
  );
};

export default Provider;
