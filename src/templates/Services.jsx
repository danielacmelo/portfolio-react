import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const Services = () => {
    const restPathPage = restBase + 'pages/13'
    const restPathPosts = restBase +  'fwd-service?_embed&orderby=title&order=asc'
    const [restDataPage, setDataPage] = useState([])
    const [restDataPosts, setDataPosts] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    const wrapContentInParagraphs = (htmlContent) => {
        const paragraphs = htmlContent.split('\n').map(line => line.trim()).filter(line => line !== '');
        const wrappedParagraphs = paragraphs.map(paragraph => `<p>${paragraph}</p>`);
        return wrappedParagraphs.join('');
    }

    useEffect(() => {
        const fetchData = async () => {
            const response_page = await fetch(restPathPage)
            const response_posts = await fetch(restPathPosts)
            if ( response_page.ok && response_posts.ok ) {
                const restDataPage = await response_page.json()
                const restDataPosts = await response_posts.json()
                setDataPage(restDataPage)
                setDataPosts(restDataPosts)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPathPage, restPathPosts])
    
    return (
        <>
        { isLoaded ?
            <article id={`post-${restDataPage.id}`}>
                <h1>{restDataPage.title.rendered}</h1>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restDataPage.content.rendered}}>
                </div>
                {restDataPosts.map(post => 
                    <article key={post.id} id={`post-${post.id}`}> 
                        <h2>{post.title.rendered}</h2>
                        <div className="entry-content" dangerouslySetInnerHTML={{ __html: wrapContentInParagraphs(post.acf.service)}}></div>
                    </article>
                )}
             
            </article>
        : 
            <Loading />
        }
        </>
    )
}

export default Services
