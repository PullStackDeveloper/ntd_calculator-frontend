import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Calculator",
    description: "NTD Calculator",
};
export default function CalculatorLayout ({
                                             children,
                                         } : {children: React.ReactNode}) {
    return (
        <>
            <main >{children}</main>
        </>
    )
}