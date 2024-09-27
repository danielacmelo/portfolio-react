import { useState, useEffect, } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import { Link } from 'react-router-dom';
import 'animate.css';

const Home = () => {
    const restPath = restBase + 'pages/8'
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
            <article className="animate__animated animate__fadeIn" id={`post-${restData.id}`}>
                <h1 className="sr-only">Dani Melo</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{ __html: restData.content.rendered }}>
                </div>
                <div className='button_margin'>
                    <Link to="/works" className="button">View Works</Link>
                </div>
            </article>
        : 
            <Loading /> 
        }
        </>            
    )
}

export default Home;
