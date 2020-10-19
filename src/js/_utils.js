(function() {
    const throttle = function(type, name, obj) {
        let running = false;
        const func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                window.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        window.addEventListener(type, func);
    };

    throttle('resize', 'optimizedResize');
    throttle('scroll', 'optimizedScroll');
})();
