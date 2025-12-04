import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMapleList } from '../api/Maple';
import MapleCard from '../components/MapleCard';

const MapleList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: maples, isLoading, error } = useQuery({
        queryKey: ['maples'],
        queryFn: getMapleList,
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredMaples = useMemo(() => {
        return maples?.filter(maple =>
            maple.character_class.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [maples, searchTerm]);

    if (isLoading) return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error loading data</div>;

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-2xl flex flex-col items-center">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
                            MapleStory Jobs
                        </h1>

                        <div className="w-full max-w-md relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition duration-150 ease-in-out"
                                placeholder="Search by job..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {filteredMaples && filteredMaples.length > 0 ? (
                        filteredMaples.map((maple) => (
                            <MapleCard key={maple.id || maple.character_name} data={maple} />
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center w-full">
                            <div className="w-64 h-40 bg-white rounded-xl shadow-xl border border-gray-200 flex items-center justify-center text-gray-500 text-lg">
                                No characters found.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapleList;
