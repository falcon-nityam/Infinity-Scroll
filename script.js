/*

Its a simple infinity scroll ->
what we actually do here is 

1. checking when user reach the end of a page
2. when they reach we load images

3. we also set a varibale 'ready' as true or false to control image fetch
4. we set everytime image load to photoArray

*/

const itemContainer=document.getElementById('image-container')
let photosArray=[]

// UNSPLASH API 
const count = 10
const apiKEY = '57rrnd4vocz0Q87mVkB9W6ICep6_aoii7fq_w8seZ0s'
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`

let imagesLoaded=0
let totalImages=0
let ready= false

// check if all the images were loaded
const imageLoaded=()=>{
    console.log('image loaded')
    imagesLoaded++
    if(imagesLoaded === totalImages){
        console.log(imagesLoaded + ' and ' + totalImages)
        ready=true
    }
}


// use DRY principle
const setAttributes=(element, attributes)=>{
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

// Display Image
const displayPhoto=()=>{
    // so it will get to 10 ervery time not get 20 or 30 
    imagesLoaded=0
    totalImages=photosArray.length

    photosArray.forEach(photo=>{
        // create <a> elem to link to unsplash
        const item=document.createElement('a')
        // item.setAttribute('href',photo.links.html)
        // item.setAttribute('target','_blank')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // create <img for photos
        const img=document.createElement('img')
        // img.setAttribute('src',photo.urls.regular)
        // img.setAttribute('title',photo.alt_description)
        // img.setAttribute('alt',photo.alt_description)
        setAttributes(img, {
            src: photo.urls.regular,
            title: photo.alt_description,
            alt: photo.alt_description
        })

        img.addEventListener('load',imageLoaded)
        // Put <img> elem into <a> elem
        item.appendChild(img)
        itemContainer.appendChild(item)
    })
}

// Get photos from unsplash API
const getPhoto = async ()=>{
    try {
        let request=await fetch(apiURL)
        // it assign new array 
        photosArray = await request.json()

        // After getting responce display photos
        displayPhoto()
        
    } catch (error) {
        // errors
        console.log(error)
    }
} 

// Scroll event for infinity scroll
window.addEventListener('scroll', ()=>{
    if(window.innerHeight+ window.scrollY >= document.body.offsetHeight - 1000 && ready){
        console.log('load more')
        ready=false
        getPhoto()
    }
})

getPhoto()