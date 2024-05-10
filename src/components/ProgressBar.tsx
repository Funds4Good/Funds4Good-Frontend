interface Props {
    progress: Number
}

const ProgressBar = ({ progress } : Props) => {
    return (
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden">
            <div
                className="bg-[#51DA21] text-white py-3 text-center"
                style={{ width: `${progress}%` }}
            >

            </div>
        </div>
    );
};

export default ProgressBar;