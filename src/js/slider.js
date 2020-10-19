const gallery = document.querySelector('.gallery__list');
console.log(gallery)

if (gallery) {
    const gallerySlider = tns({
        container: gallery,
        prevButton: document.querySelector('.gallery__control_previous'),
        nextButton: document.querySelector('.gallery__control_next'),
        navContainer: document.querySelector('.gallery__nav'),
        responsive: {
            0: {
                fixedWidth: 210,
                gutter: 16,
                edgePadding: 16
            },
            1200: {
                fixedWidth: false,
                items: 4,
                gutter: 20
            }
          }
    });
}
