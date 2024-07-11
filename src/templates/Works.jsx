import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'

const Works = () => {
    const restPath = restBase + 'dcm-work?_embed&order=asc'
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
            <>
                <h1>Works</h1>
                {restData.map(post => 
                    <article key={post.id} id={`post-${post.id}`}>
                        {post.featured_media !== 0 && post._embedded &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        <h2>{post.title.rendered}</h2>
                        {post.acf && post.acf.tools_and_skills && 
                            <h3>{Array.isArray(post.acf.tools_and_skills) ? post.acf.tools_and_skills.join(' | ') : post.acf.tools_and_skills}</h3>
                        }
                    </article>
                )}
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Works