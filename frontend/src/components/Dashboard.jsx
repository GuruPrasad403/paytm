import Balance from "./Balance";
import Header from "./Header";
import User from "./User";

export default function DashBoard(){
    return(
        <div className="w-full h-screen bg-gray-800 text-amber-50 ">
            <Header />
            <Balance />
            <User />
        </div>
    )
}