import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loading from '../utilities/Loading'
import { restBase , featuredImage } from '../utilities/Utilities'
import 'animate.css'

const Post = () => {
    const { slug } = useParams();
    const restPath = `${restBase}dcm-work?slug=${slug}&_embed=true`;
    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setData(data[0]);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <>
            {isLoaded ? (
                <>
                    <article id={`post-${restData.id}`}>
                        {restData.featured_media !== 0 && restData._embedded && (
                            <figure
                                className="featured-image animate__animated animate__fadeIn"
                                dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}
                            ></figure>
                        )}
                        <h1>{restData.title.rendered}</h1>
                        <div
                            className="entry-content"
                            dangerouslySetInnerHTML={{ __html: restData.content.rendered }}
                        ></div>
                    </article>
                    <nav className="posts-navigation">
                        {restData.previous_post?.id && (
                            <Link to={`/dcm-work/${restData.previous_post.slug}`} className="prev-post">
                                Previous: {restData.previous_post.title}
                            </Link>
                        )}
                        {restData.next_post?.id && (
                            <Link to={`/dcm-work/${restData.next_post.slug}`} className="next-post">
                                Next: {restData.next_post.title}
                            </Link>
                        )}
                    </nav>
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Post;
