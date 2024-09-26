import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import { Link } from 'react-router-dom'

const NotFound = () => {
    const restPath = restBase + 'pages/172'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    
    return (
        <>
        { isLoaded ?
            <article id={`post-${restData.id}`}>
            <h1>{restData.title.rendered}</h1>
            <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
            </div>
            <p className='link'>Go to <Link to="/">Home</Link>.</p>
         </article>
        : 
            <Loading /> 
        }
        </>            
    )
}

export default NotFound;
