const accessKey = "U45lchx_6wY0DJ7SFpMoBfcbBX_s8hBcj5OR10xY7FQ";
const searchBtn = document.getElementById('search-btn');
const photoList = document.getElementById('photo');
const photoDetailsContent = document.querySelector('.photo-details-content');
const photoCloseBtn = document.getElementById('photo-close-btn');

// EVENT LISTENERS
searchBtn.addEventListener('click', getPhotoList);
photoList.addEventListener('click', getPhotoImages);
photoCloseBtn.addEventListener('click', () => {
    photoDetailsContent.parentElement.classList.remove('showPhoto');
});

// GET SEARCHED PHOTOS FROM API
async function getPhotoList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchInputTxt}&client_id=${accessKey}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.results){
            data.results.forEach(photo => {
                html += `
                <div class="container-photo">
                    <div class = "photo-item" data-id = "${photo.id}">
                        <div class = "photo-img">
                            <img src = "${photo.urls.small}" alt = "photo">
                        </div>
                        <div class = "photo-name" >
                            <a href = "#" class = "photo-btn">Get Image</a>
                        </div>
                    </div>
                </div>
                `;
            });
            photoList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find the photo!";
            photoList.classList.add('notFound');
        }

        photoList.innerHTML = html;
    });
}

// GET IMAGE BUTTON
function getPhotoImages(e){
    e.preventDefault();
    if(e.target.classList.contains('photo-btn')){
        let photoItem = e.target.parentElement.parentElement.parentElement;
        fetch(`https://api.unsplash.com/search/photos?query=${photoItem.dataset.id}&client_id=${accessKey}`)
        .then(response => response.json())
        .then(data => photoImagesModal(data.results));
    }
}

// CREATE A MODAL
function photoImagesModal(photo){
    console.log(photo);
    photo = photo[0];
    let html = `
        <div class="container-modal">
        <h2 class = "photo-title">nikko!</h2>
        <p class = "photo-category">This photo has ${photo.likes} likes!</p>
        <div class = "photo-instruct">
            <h3>A great shot by</h3>
        </div>
        <div class = "photo-photo-img">
            <img src = "${photo.user.profile_image.large}" alt = "">
            <h4>${photo.user.name}</h4>
        </div>
        <div class = "photo-link">
            <a href = "${photo.links.html}" target = "_blank">Download Image</a><span></span>
            <a href = "${photo.user.links.html}" target = "_blank">Visit Photographer</a>
        </div>
        </div>
    `;
    photoDetailsContent.innerHTML = html;
    photoDetailsContent.parentElement.classList.add('showPhoto');
}