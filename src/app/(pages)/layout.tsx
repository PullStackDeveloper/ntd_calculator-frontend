import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/app/components/header/header";
import Footer from "@/app/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NTD Calculator",
    description: "Home NTD Calculator",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} container-fluid p-0 m-0 d-flex flex-column`}>
        <main className="flex-grow-1 ">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
