import React, { useRef, useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacterBasic } from '../api/Maple';

const MapleCard = React.memo(({ data }) => {
    const cardRef = useRef(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotate({ x: 0, y: 0 });
    }, []);

    const { data: characterBasic } = useQuery({
        queryKey: ['characterBasic', data.ocid],
        queryFn: () => getCharacterBasic(data.ocid),
        enabled: !!data.ocid,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });

    return (
        <div
            className="perspective-1000 w-[332px] h-52 cursor-pointer"
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

                <div className="relative flex flex-row items-center h-full z-10 w-full">
                    <div className="flex-shrink-0 w-32 h-full flex items-center justify-center overflow-hidden bg-gray-50/50">
                        {characterBasic?.character_image ? (
                            <img
                                src={characterBasic.character_image}
                                alt={data.character_name}
                                className="h-full object-contain transform scale-150 translate-y-4"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                No Img
                            </div>
                        )}
                    </div>

                    <div className="flex-grow space-y-1 p-4">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                            <span className="text-gray-500 font-medium text-sm">Name</span>
                            <span className="text-gray-800 font-bold text-base">{data.character_name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                            <span className="text-gray-500 font-medium text-sm">World</span>
                            <span className="text-gray-800 font-semibold text-sm">{data.world_name}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                            <span className="text-gray-500 font-medium text-sm">Class</span>
                            <span className="text-blue-600 font-semibold text-sm">{data.character_class}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-100 pb-1">
                            <span className="text-gray-500 font-medium text-sm">Level</span>
                            <span className={`font-bold text-sm ${(data.character_level || 0) < 100 ? 'text-green-600' :
                                (data.character_level || 0) < 200 ? 'text-orange-500' :
                                    'text-purple-600'
                                }`}>
                                {data.character_level || 'N/A'}
                            </span>
                        </div>
                    </div>
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
});

export default MapleCard;
