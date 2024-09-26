import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'
import 'animate.css'

const toUppercaseFirstLetter = (text) => {
    return text.split(' ')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
               .join(' ');
}

const Works = () => {
    const restPath = restBase + 'dcm-work?_embed&order=asc'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if (response.ok) {
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
                <div className="works animate__animated animate__fadeIn">
                    {restData.map(post => 
                        <article key={post.id} id={`post-${post.id}`}>
                            <a href={`works/${post.slug}`}>
                                {post.featured_media !== 0 && post._embedded &&
                                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                                }
                                <h2>{post.title.rendered}</h2>
                                {post.acf && post.acf.tools_and_skills && 
                                    <h3>{Array.isArray(post.acf.tools_and_skills) ? toUppercaseFirstLetter(post.acf.tools_and_skills.join(' | ')) : toUppercaseFirstLetter(post.acf.tools_and_skills)}</h3>
                                }
                            </a>
                        </article>
                    )}
                </div>
            </>
        : 
            <Loading />
        }
        </>
    )
}

export default Works;
