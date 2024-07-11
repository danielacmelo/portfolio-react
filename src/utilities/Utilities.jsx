export const restBase = 'https://danimelo.ca/portfolio/wp-json/wp/v2/'

export const featuredImage = (featuredImageObject) => {
  const landscapeProject = featuredImageObject.media_details.sizes.landscape_projects;
  const imgWidth = landscapeProject ? landscapeProject.width : featuredImageObject.media_details.sizes.full.width;
  const imgHeight = landscapeProject ? landscapeProject.height : featuredImageObject.media_details.sizes.full.height;
  const imgURL = landscapeProject ? landscapeProject.source_url : featuredImageObject.source_url;
  let img = `<img src="${imgURL}" 
      width="${imgWidth}"
      height="${imgHeight}"
      alt="${featuredImageObject.alt_text}"
      srcset="${imgURL} ${imgWidth}w,
      ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
      ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
      ${landscapeProject ? landscapeProject.source_url + ' 530w,' : ''}
      ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
      sizes="(max-width: ${imgWidth}px) 100vw, ${imgWidth}px">`;
  return {__html: img};
}
