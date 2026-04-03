// Switch between Light and Dark Mode
// const themeBtn = document.getElementById('theme-toggle');

// themeBtn.addEventListener('click', function() {
//     document.body.classList.toggle('dark-mode');
// });

document.addEventListener("DOMContentLoaded", function() {
    //        SMART DARK MODE TOGGLE

    const themeBtn = document.getElementById('theme-toggle');

    // 1. When the page loads, check the browser's memory notebook
    if (localStorage.getItem('myPortfolioTheme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 2. When the button is clicked, change the theme AND write it in the notebook
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            // Flip the colors
            document.body.classList.toggle('dark-mode');
            
            // Save the choice so other pages know what to do
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('myPortfolioTheme', 'dark');
            } else {
                localStorage.setItem('myPortfolioTheme', 'light');
            }
        });
    }

    // ... (Keep all your image loading code down below exactly as it is!) ...

    // function loadAllImages(galleryId, folderPath) {
    //     const gallery = document.getElementById(galleryId);
        
    //     if (gallery) {
    //         let currentNumber = 1;

    //         function tryNextImage() {
    //             const itemBox = document.createElement('div');
    //             itemBox.className = 'pinterest-item';
    //             const myImage = document.createElement('img');

    //             // If the image loads successfully, put it on the page and try the next number
    //             myImage.onload = function() {
    //                 itemBox.appendChild(myImage);
    //                 gallery.appendChild(itemBox);
    //                 currentNumber++;
    //                 tryNextImage(); 
    //             };

    //             // If it fails, try the other file types. If they all fail, it stops automatically.
    //             myImage.onerror = function() {
    //                 if (this.src.includes('.png')) {
    //                     this.src = folderPath + currentNumber + '.JPG';
    //                 } else if (this.src.includes('.JPG')) {
    //                     this.src = folderPath + currentNumber + '.jpg';
    //                 } 
                    
    //             };

    //             myImage.src = folderPath + currentNumber + '.png';
    //             myImage.alt = 'Artwork ' + currentNumber;
    //         }

    //         // Start the process for this gallery
    //         tryNextImage();
    //     }
    // }

    function loadAllImages(galleryId, folderPath, totalImages) {
        const gallery = document.getElementById(galleryId);
        
        if (gallery) {
            // Wipe the old category cleanly
            gallery.innerHTML = ''; 

            const galleryObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the box enters the screen, add the visible class
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

            // Build the EXACT number of boxes needed—no guessing, no ghost boxes!
            for (let i = 1; i <= totalImages; i++) {
                
                const itemBox = document.createElement('div');
                itemBox.className = 'pinterest-item';
                itemBox.id = `box-${galleryId}-${i}`; 
                gallery.appendChild(itemBox);

                const myImage = document.createElement('img');

                myImage.onload = function() {
                    const targetBox = document.getElementById(`box-${galleryId}-${i}`);
                    if (targetBox) {
                        targetBox.appendChild(myImage);
                    }
                };

                myImage.onerror = function() {
                    if (this.src.includes('.png')) {
                        this.src = folderPath + i + '.JPG';
                    } else if (this.src.includes('.JPG')) {
                        this.src = folderPath + i + '.jpg';
                    } 
                    // We completely removed the "delete box" code because we don't need it anymore!
                };

                myImage.src = folderPath + i + '.png';
                myImage.alt = 'Artwork ' + i;
            }
        }
    }

    // Load Art Galleries
    loadAllImages('drawing-gallery', 'img/ART/drawing/',11);
    loadAllImages('photo-gallery', 'img/ART/photo/',28);

    // Load Activity Galleries
    loadAllImages('activity-one-gallery', 'img/ACTIVITIES/ECs/', 16);
    loadAllImages('activity-two-gallery', 'img/ACTIVITIES/SchoolProjects_Events/', 15);
    loadAllImages('activity-three-gallery', 'img/ACTIVITIES/Models/', 9);

        
    // ================= THE HANDBOOK PAGE LOADER =========================
    function loadHandbookPages(containerId, folderPath) {
        const container = document.getElementById(containerId);
        
        if (container) {
            let currentNumber = 1;

            // 1. Set up the scroll watcher (Intersection Observer)
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1 // Triggers when 10% of the image enters the screen
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    // If the image scrolls into view, add the visible class!
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Stop watching it once it's loaded so it doesn't repeat
                        observer.unobserve(entry.target); 
                    }
                });
            }, observerOptions);

            // 2. The Image Loader
            function tryNextPage() {
                const myImage = document.createElement('img');

                myImage.onload = function() {
                    // Add the fade-in-section class along with the landscape/portrait classes
                    if (this.naturalWidth > this.naturalHeight) {
                        this.className = 'page-landscape fade-in-section';
                    } else {
                        this.className = 'page-portrait fade-in-section';
                    }
                    
                    container.appendChild(myImage);
                    
                    // Tell our scroll watcher to keep an eye on this new image
                    observer.observe(myImage);

                    currentNumber++;
                    tryNextPage(); 
                };

                myImage.onerror = function() {
                    if (this.src.includes('.png')) {
                        this.src = folderPath + currentNumber + '.JPG';
                    } else if (this.src.includes('.JPG')) {
                        this.src = folderPath + currentNumber + '.jpg';
                    } 
                };

                myImage.src = folderPath + currentNumber + '.png';
                myImage.alt = 'Handbook Page ' + currentNumber;
            }

            tryNextPage();
        }
    }

    loadHandbookPages('handbook-content', 'img/PRODUCT/Handbook/');
    loadHandbookPages('brochure-content', 'img/PRODUCT/Brochure/');
    loadHandbookPages('bookstreet-content', 'img/PRODUCT/BookStreet/');
});

// ==========================================
//        BACKSTAGE STORY LOADER
const myStories = [
    {
        image: "1.jpg",
        // title: "Late Night Sketches",
        text: "This photo with my Physics teacher was taken during a small event of our club, months before she was diagnosed with cancer. She has always been camera-shy, so I only have a few photos with her. Although she’s been recovering, she is not yet ready to return to teaching."
    },
    {
        image: "2.jpg",
        title: "Setting up the Shot",
        text: "My proudest handmade booth of our club. We spent a whole week focusing only on it, working on all the small details and extra pieces."
    },
    {
        image: "3.jpg", 
        // title: "The Editing Process",
        text: "A picture at the end of a class at my charity project. I finally gave the white bows to the kids. Since then, I started bringing more tiny extra gifts along, like stickers, cutesy hairpins, etc."
    },
    {
        image: "4.png",
        // title: "Printing the Final Book",
        text: "Tutoring IELTS has somewhat become a stable income for me for some time. I use the money to support my personal interests and expenses, rarely relying on allowances from my parents."
    },
    {
        image: "5.jpg",
        // title: "Another Story",
        text: "I slowly became the class photographer after taking photos more often for my classmates. From school events to small daily moments, I enjoyed capturing memories that later became something we could all look back on."
    }
];
const storyContainer = document.getElementById('backstage-content');

if (storyContainer) {
    
    // Set up the scroll watcher for the beautiful fade-in effect
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const backstageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Look at every single story in your list
    myStories.forEach((story, index) => {
        
        // The Math Trick: If it is an odd number, flip it to the right
        let isReverse = "";
        if (index % 2 !== 0) {
            isReverse = "reverse";
        }

        // Build the story box
        const storyHTML = `
            <div class="story-row ${isReverse} fade-in-section">
                <div class="story-img">
                    <img src="img/BACKSTAGE/${story.image}" alt="${story.title}">
                </div>
                <div class="story-text">
                    
                    <p>${story.text}</p>
                </div>
            </div>
        `;

        // Put it on the page
        storyContainer.insertAdjacentHTML('beforeend', storyHTML);

        // Tell the scroll watcher to look for this specific story
        backstageObserver.observe(storyContainer.lastElementChild);
    });
}

