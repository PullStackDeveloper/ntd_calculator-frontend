import LoginForm from "@/app/components/login/loginForm";
import Header from "@/app/components/header/header";
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession();
    return (
        <>
            <Header session={session}/>
            <LoginForm/>
        </>
    );
}