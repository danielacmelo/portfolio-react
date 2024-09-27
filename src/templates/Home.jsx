import { useState, useEffect, } from 'react';
import Loading from '../utilities/Loading';
import { restBase } from '../utilities/Utilities';
import { Link } from 'react-router-dom';
import 'animate.css';
import { Helmet } from 'react-helmet-async';


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

        <Helmet>
            <title>Dani Melo - Front-End Developer</title>
            <meta name="description" content="Dani Melo's portfolio showcasing early career projects in front-end development, specializing in WordPress, WooCommerce, Shopify, and React. Recent BCIT graduate." />
            <meta name="keywords" content="Junior Front-End Developer, WordPress, Shopify, E-commerce, React, BCIT Graduate, Web Development, Dani Melo, Daniela Melo" />
            <meta property="og:title" content="Dani Melo - Front-End Developer" />
            <meta property="og:description" content="Explore the portfolio of Dani Melo, a recent BCIT graduate and aspiring front-end developer with a passion for web development and e-commerce solutions." />
            <meta property="og:url" content="https://danimelo.ca/" />
            <meta property="og:type" content="website" />
        </Helmet>

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
