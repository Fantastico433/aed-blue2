document.addEventListener('DOMContentLoaded', () => {
    // JSON structure for images with additional metadata
    const imageData = [
        { "src": "galerii/IMG_20200123_150205.jpg", "alt": "A beautiful wooden fence surrounding a garden" },
        { "src": "galerii/IMG_20220420_173352.jpg", "alt": "Modern metal fence in an urban setting" },
        { "src": "galerii/IMG_20220504_160356.jpg", "alt": "A sturdy wire fence enclosing a large area" },
        { "src": "galerii/IMG_20220523_142843.jpg", "alt": "Elegant stone and metal fence combination" },
        { "src": "galerii/IMG_20220721_171224.jpg", "alt": "Decorative white picket fence for a cottage-style home" },
        { "src": "galerii/74967746_111014193683796_1173667699885080576_n.jpg", "alt": "Stylish black iron fence with intricate details" },
        { "src": "galerii/75398131_111013953683820_4700289222353879040_n.jpg", "alt": "Tall privacy fence made of natural wood" },
        { "src": "galerii/75439303_111014163683799_7213036259508224000_n.jpg", "alt": "Classic garden fence with a gate" },
        { "src": "galerii/331538563_1660583681025488_3846164463612154615_n.jpg", "alt": "Vinyl fence designed for a modern backyard" },
        { "src": "galerii/363355009_760098972783375_4649593209159172349_n.jpg", "alt": "Chain-link fence for a commercial space" },
        { "src": "galerii/FB_IMG_1682881006133.jpg", "alt": "Elegant wrought iron fence with floral accents" },
        { "src": "galerii/IMG_20180908_161454.jpg", "alt": "Rustic split-rail fence for countryside property" },
        { "src": "galerii/IMG_20180914_162343.jpg", "alt": "Privacy fence with lattice design on top" },
        { "src": "galerii/IMG_20190508_121215.jpg", "alt": "White vinyl fence surrounding a family backyard" },
        { "src": "galerii/IMG_20190527_134324.jpg", "alt": "Simple wooden fence for a suburban home" },
        { "src": "galerii/IMG_20190628_174748.jpg", "alt": "Tall metal fence for added security" },
        { "src": "galerii/IMG_20190806_122349.jpg", "alt": "Elegant iron fence with curved design elements" },
        { "src": "galerii/IMG_20190813_133524.jpg", "alt": "Sturdy chain-link fence for pet containment" },
        { "src": "galerii/IMG_20190813_134401.jpg", "alt": "Wooden fence with horizontal slats for a sleek look" },
        { "src": "galerii/IMG_20190912_194014.jpg", "alt": "Traditional picket fence with charming style" }
        // Add more images here as needed
    ];

    // Select Swiper wrapper and dynamically add images
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    imageData.forEach(image => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        // Create the zoom container and add the image
        const zoomContainer = document.createElement("div");
        zoomContainer.classList.add("swiper-zoom-container");

        const img = document.createElement("img");
        img.src = image.src;
        img.alt = image.alt; // Customize alt text as needed
        img.loading = "lazy"; // Enable lazy-loading for optimized loading

        zoomContainer.appendChild(img);
        slide.appendChild(zoomContainer);
        swiperWrapper.appendChild(slide);
    });

    // Initialize Swiper after slides have been added
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000, // Auto-slide every 3 seconds
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        zoom: {
            maxRatio: 2, // Adjust max zoom level as needed
        }
    
        
    });
});


    // Scroll to contact section on button click
    const contactButton = document.getElementById('scrollToContact');
    contactButton.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });

    // Handle service item click to enlarge image
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('click', () => {
            const modal = createModal(item.dataset.img, item.dataset.description, item.dataset.alt);
            document.body.appendChild(modal);
        });
    });

    // Function to create a modal for services
    const createModal = (imgSrc, description, altText) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imgSrc}" alt="${altText}" />
                <p>${description}</p>
                <button class="close-modal">Sulge</button>
            </div>
        `;

        // Close the modal on clicking the close button or outside the modal content
        modal.addEventListener('click', (event) => {
            if (event.target === modal || event.target.classList.contains('close-modal')) {
                document.body.removeChild(modal);
            }
        });

        return modal;
    };
     

    // JavaScript: Apply smooth scrolling with offset
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 80, // Adjust the offset (e.g., 80px)
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(contactForm),
            });
            
            if (response.ok) {
                formSuccess.style.display = 'block';
                formError.style.display = 'none';
                contactForm.reset(); // Reset form fields on success
            } else {
                formError.style.display = 'block';
                formSuccess.style.display = 'none';
            }
        } catch (error) {
            console.error('Fetch error:', error);
            formError.textContent = "Viga! Palun proovige uuesti.";
            formError.style.display = 'block';
            formSuccess.style.display = 'none';
        }
    });
});


// Preload images when hovering over elements with 'data-img' attributes
function preloadImages() {
    document.querySelectorAll('[data-img]').forEach(element => {
        element.addEventListener('mouseenter', () => {
            const imgSrc = element.getAttribute('data-img');
            if (imgSrc) {
                const img = new Image();
                img.src = imgSrc;
            }
        });
    });
}

const recaptchaResponse = grecaptcha.getResponse();
if (!recaptchaResponse) {
    alert("Please complete the reCAPTCHA verification.");
    return;
}
formData.append("g-recaptcha-response", recaptchaResponse); // Add reCAPTCHA token to form data
