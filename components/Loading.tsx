import {OrbitProgress} from "react-loading-indicators"
const Loading = ()=>{
    return (
        <div className="flex flex-col items-center animate-fade-in pt-16">
            <OrbitProgress variant="track-disc" color="crimson" size="small" />
        </div>
    )
}
export default Loading