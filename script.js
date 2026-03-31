// Switch between Light and Dark Mode
const themeBtn = document.getElementById('theme-toggle');

themeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

function loadAllImages(galleryId, folderPath) {
    const gallery = document.getElementById(galleryId);
    
    if (gallery) {
        let currentNumber = 1;

        function tryNextImage() {
            const itemBox = document.createElement('div');
            itemBox.className = 'pinterest-item';
            const myImage = document.createElement('img');

            // If the image loads successfully, put it on the page and try the next number
            myImage.onload = function() {
                itemBox.appendChild(myImage);
                gallery.appendChild(itemBox);
                currentNumber++;
                tryNextImage(); 
            };

            // If it fails, try the other file types. If they all fail, it stops automatically.
            myImage.onerror = function() {
                if (this.src.includes('.png')) {
                    this.src = folderPath + currentNumber + '.JPG';
                } else if (this.src.includes('.JPG')) {
                    this.src = folderPath + currentNumber + '.jpg';
                } 
                
            };

            
            myImage.src = folderPath + currentNumber + '.png';
            myImage.alt = 'Artwork ' + currentNumber;
        }

        // Start the process for this gallery
        tryNextImage();
    }
}
// Load Art Galleries
loadAllImages('drawing-gallery', 'img/ART/drawing/');
loadAllImages('photo-gallery', 'img/ART/photo/');

// Load Activity Galleries
loadAllImages('activity-one-gallery', 'img/ART/drawing/');
loadAllImages('activity-two-gallery', 'img/ART/photo/');
loadAllImages('activity-three-gallery', 'img/ACTIVITIES/activity3/');