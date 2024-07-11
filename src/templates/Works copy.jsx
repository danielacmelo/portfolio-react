import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'

const Works = () => {
    const restPath = restBase + 'dcm-work?_embed&orderby=title&order=asc'
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
                        <div className="entry-content" dangerouslySetInnerHTML={{__html:post.content.rendered}}></div>
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