(function() {
    const pageHeader = document.querySelector('.page-header');
    const promoSection = document.querySelector('.promo');
    const orderButton = document.querySelector('.promo__button');
    const orderForm = document.querySelector('.order__form');
    const sizes = {};

    initScrollListener();
    window.addEventListener('optimizedResize', initScrollListener);

    function initScrollListener() {
        if (window.innerWidth < 1400) {
            sizes.pageHeaderHeight = pageHeader.offsetHeight;
            sizes.promoSectionHeight = promoSection.offsetHeight;
            sizes.orderFormHeight = orderForm.offsetHeight;
            sizes.orderFormVisibleTop = orderForm.offsetTop - window.innerHeight;

            window.addEventListener('optimizedScroll', onWindowScroll);
        } else {
            window.removeEventListener('optimizedScroll', onWindowScroll);
        }
    };

    function onWindowScroll() {
        const scrolled = window.pageYOffset;

        if (
            (scrolled > sizes.promoSectionHeight + sizes.pageHeaderHeight)
            &&
            !(
                // период когда форма попадает во вьюпорт и когда полностью прокручена + 200 пикселей
                scrolled > sizes.orderFormVisibleTop
                &&
                scrolled < sizes.orderFormVisibleTop + sizes.orderFormHeight + 200
            )
        ) {
            orderButton.classList.add('promo__button_fixed');
        } else {
            orderButton.classList.remove('promo__button_fixed');
        }
    };
})();
