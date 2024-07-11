import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase, featuredImage } from '../utilities/Utilities'

const Works = () => {
    const restPath = restBase + 'fwd-work?_embed&orderby=title&order=asc'
    const categoryPath = `${restBase}fwd-work-category`
    const [restData, setData] = useState([])
    const [categories, setCategories] = useState({})
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            const categoriesResponse = await fetch(categoryPath)
            if (response.ok && categoriesResponse.ok) {
                const data = await response.json()
                const categoriesData = await categoriesResponse.json()
                const categoryMap = categoriesData.reduce((map, category) => {
                    map[category.id] = category.name
                    return map
                }, {})
                setData(data)
                setCategories(categoryMap)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath, categoryPath])
    
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
                        <p>Work Category: {post['fwd-work-category'] && post['fwd-work-category'].map(categoryId => categories[categoryId]).join(', ')}</p>
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