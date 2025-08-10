import { PuffLoader } from "react-spinners";

const LoadingScreen = () => {
    return <div className="absolute top-0 left-0 text-center flex justify-center items-center h-screen w-screen">
        <PuffLoader color="#2563eb" />
    </div>
}

export default LoadingScreen;