import { useState, useEffect } from 'react'
import { getMapleList, getMapleByJob } from '../api/Maple'

function MapleList() {
    const [maples, setMaples] = useState([])
    const [searchJob, setSearchJob] = useState('')

    useEffect(() => {
        loadMaples()
    }, [])

    const loadMaples = async () => {
        try {
            const data = await getMapleList()
            setMaples(data)
        } catch (error) {
            console.error("Failed to fetch maples:", error)
        }
    }

    const handleSearch = async () => {
        if (!searchJob.trim()) {
            loadMaples()
            return
        }
        try {
            const data = await getMapleByJob(searchJob)
            setMaples(data)
        } catch (error) {
            console.error("Failed to search maples:", error)
        }
    }

    return (
        <div className="maple-list-container">
            <h2>Maple Characters</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Job"
                    value={searchJob}
                    onChange={(e) => setSearchJob(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul className="maple-list">
                {maples.map((maple) => (
                    <li key={maple.id} className="maple-item">
                        <strong>{maple.name}</strong> - {maple.job} (Lv. {maple.level})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MapleList
