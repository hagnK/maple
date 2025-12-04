import React, { useRef, useState } from 'react';

const MapleCard = ({ data }) => {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            className="perspective-1000 w-64 h-80 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                ref={cardRef}
                className="w-full h-full bg-white rounded-xl shadow-xl transition-transform duration-200 ease-out transform-style-3d border border-gray-200 overflow-hidden relative group"
                style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />

                <div className="relative p-6 flex flex-col justify-center h-full z-10 w-full">
                    <div className="space-y-4 w-full">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Name</span>
                            <span className="text-gray-800 font-bold text-lg">{data.name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Job</span>
                            <span className="text-blue-600 font-semibold">{data.job}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                            <span className="text-gray-500 font-medium">Level</span>
                            <span className={`font-bold ${(data.level || 0) < 100 ? 'text-green-600' :
                                    (data.level || 0) < 200 ? 'text-orange-500' :
                                        'text-purple-600'
                                }`}>
                                {data.level || 'N/A'}
                            </span>
                        </div>
                    </div>

                    {data.description && (
                        <p className="text-gray-400 text-xs text-center mt-6 italic">
                            {data.description}
                        </p>
                    )}
                </div>

                {/* Shine effect */}
                <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                        transform: `translateZ(1px)`
                    }}
                />
            </div>
        </div>
    );
};

export default MapleCard;
