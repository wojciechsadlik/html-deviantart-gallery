const GALLERY_SEARCH_PREFIX = 'https://backend.deviantart.com/rss.xml?q=gallery:'

const GALLERY_DIV_ID = 'deviantart-gallery'

window.onload = () => {
    const gallery_div = document.getElementById(GALLERY_DIV_ID)
    const GALLERY_ID = gallery_div.getAttribute('gallery-id')
    if (!GALLERY_ID) {
        console.error('gallery-id undefined')
        return
    }

    const parser = new DOMParser()
    
    const RSS_QUERY = GALLERY_SEARCH_PREFIX + GALLERY_ID
    fetch(RSS_QUERY).then(r => {
        return r.text()
    }).then(r => {
        createGallery(parser.parseFromString(r, 'text/xml'), gallery_div)
    })
}

function createGallery(gallery_resp_doc, gallery_div) {
    const channel = gallery_resp_doc.getElementsByTagName('channel')[0]
    const items = channel.getElementsByTagName('item')
    for (const item of items) {
        const link = item.getElementsByTagName('link')[0].textContent
        const thumbnails = item.getElementsByTagName('media:thumbnail')
        gallery_div.innerHTML += `
            <div>
                <a href=${link}>
                    <img src=${thumbnails[0].getAttribute('url')} />
                </a>
            </div>
        `
    }
}