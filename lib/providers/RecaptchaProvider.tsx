"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ReactNode } from "react";

interface RecaptchaProviderProps {
    children: ReactNode;
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
    const recaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA;

    if (!recaptchaKey) {
        return <>{children}</>;
    }

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaKey}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    );
}
