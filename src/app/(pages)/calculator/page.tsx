import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/app/components/header/header";
import CalculatorContent from "@/app/(pages)/calculator/calculatorContent";
import { authOptions } from "@/app/components/auth/AuthOptions";

interface CustomSession {
    user: {
        accessToken: string,
        iat: number,
        exp: number,
        jti: string
    }

}

export default async function CalculatorPage() {
    const session = await getServerSession(authOptions) as CustomSession;
    if (!session) {
        redirect("/");
    }

    if (!session?.user?.accessToken) {
        redirect("/");
    }

    return (
        <>
            <Header session={session} />
            <CalculatorContent token={session.user.accessToken} />
        </>
    );
}
