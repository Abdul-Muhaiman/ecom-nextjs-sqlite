import Link from "next/link"; // For revalidation after submission
export default function Page() {
    return (
        <div className={"text-center flex flex-col items-center justify-center pt-10"}>
            <p className={"text-4xl"}>HOME PAGE</p>
            <Link href={"/register"}>
                <button className={"px-4 py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white rounded-lg"}>
                    Register
                </button>
            </Link>
        </div>
    );
}
