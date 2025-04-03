import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function Page() {
    const session = await getServerSession(authOptions);

    if(!session){
        return (
            <div className={"text-center flex flex-col items-center justify-center pt-10"}>
                <p className={"text-4xl"}>HOME PAGE</p>
            </div>
        );
    }

    return (
        <div className={"text-center flex flex-col items-center justify-center pt-10"}>
            <p className={"text-4xl"}>HOME PAGE</p>
            <div className={"mt-4 font-light space-y-1 flex flex-col items-start justify-center"}>
                <span>Id: {session.user.id}</span>
                <span>Name: {session.user.name}</span>
                <span>Email: {session.user.email}</span>
                <span>Role: {session.user.role}</span>
            </div>
        </div>
    );
}
