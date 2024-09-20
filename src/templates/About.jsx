import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'

const About = () => {
    const restPath = restBase + 'pages/12';
    const [restData, setData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);
    const [galleryImages, setGalleryImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    setData(data);

                    // Extracting image IDs from the ACF 'images' field
                    const imagesField = data.acf.images;
                    if (imagesField && Array.isArray(imagesField)) {
                        const imageRequests = imagesField.map(id => fetch(`${restBase}media/${id}`));
                        const images = await Promise.all(imageRequests);
                        const imageData = await Promise.all(images.map(img => img.json()));
                        setGalleryImages(imageData);
                    }
                    setLoadStatus(true);
                } else {
                    setLoadStatus(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);

    return (
        <>
            {isLoaded && restData ? (
                <article id={`post-${restData.id}`}>
                    <h1>{restData.title.rendered}</h1>
                    <div className="entry-content" dangerouslySetInnerHTML={{ __html: restData.content.rendered }}></div>
                    <div className="gallery animate__animated animate__pulse">
                        {galleryImages.map((imgData, index) => {
                            const landscapeAbout = imgData.media_details.sizes['landscape-about'];
                            const imgURL = landscapeAbout ? landscapeAbout.source_url : imgData.source_url;
                            const imgWidth = landscapeAbout ? landscapeAbout.width : imgData.media_details.width;
                            const imgHeight = landscapeAbout ? landscapeAbout.height : imgData.media_details.height;
                            
                            return (
                                <img
                                    key={index}
                                    src={imgURL}
                                    width={imgWidth}
                                    height={imgHeight}
                                    alt={imgData.alt_text || `Gallery image ${index + 1}`}
                                />
                            );
                        })}
                    </div>
                </article>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default About;
