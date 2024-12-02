import { HashLoader } from "react-spinners";

const OverlayLoader = () => {
    return <div className="absolute top-0 left-0 text-center flex justify-center items-center h-screen w-screen">
        <HashLoader color="#06b6d4" />
    </div>
}

export default OverlayLoader;
