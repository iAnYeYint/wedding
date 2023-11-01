document.addEventListener("DOMContentLoaded", function () {
    setupDimensions(2)
    document.getElementById("whole-book").onclick = function (event) {
        const duration = 1300;
        const steps = 3;
        const el = document.getElementById("book-front")
        const isOpened = 'true' === el.dataset.opened ?? false;
        const configs = responsiveConfigs()

        if (isOpened) {
            closeCard(duration)
            closeScroll(duration)
            if(configs.bookMoveOnOpen) {
                moveBookToCenter(duration * 0.7)
            }
        } else {
            openCard(duration)
            openScroll(duration)
            if(configs.bookMoveOnOpen) {
                moveBookToEnd(duration * 0.7)
            }
        }

        setTimeout(function () {
            if (isOpened) {
                el.style.backgroundImage = "url('img-invitation-card/card-01-cutout.png')"
            } else {
                el.style.backgroundImage = "url('img-invitation-card/card-02-flipped.png')"
            }
        }, duration / 2)

        el.dataset.opened = !isOpened

    }

}, false);


function responsiveConfigs() {
    let values = {
        bookWidthSetup: true,
        bookMoveOnOpen: true
    }

    if (screen.width <= 767) {
        values.bookWidthSetup = false
        values.bookMoveOnOpen = false
    } else if (screen.width <= 480) {
        values.values.bookMoveOnOpen = false
    }

    return values;
}

function setupDimensions(noOfPages = 2) {
    const coverEl = document.getElementById('book-front')
    const bookEl = document.getElementById('whole-book')
    const configs = responsiveConfigs()

    bookEl.dataset.singlewidth = coverEl.clientWidth
    bookEl.dataset.wholeheight = coverEl.clientHeight

    if (configs.bookWidthSetup) {
        bookEl.style.width = parseInt(coverEl.clientWidth) * noOfPages + "px"
    }
}


function openCard(duration) {
    anime({
        targets: '.book-cover',
        keyframes: [
            {rotateY: 60, easing: 'linear'},
            {rotateY: 120, easing: 'linear'},
            {rotateY: 180, easing: 'linear'}
        ],
        duration: duration
    });
}

function openScroll(duration) {
    anime({
        targets: '.scroll-paper',
        keyframes: [
            {height: 30, easing: 'linear'},
            {height: getScrollHeight(), easing: 'linear'}
        ],
        duration: duration
    });
}

function getScrollHeight() {
    const bookEl = document.getElementById('whole-book')
    let result = 0;
    const height = parseInt(bookEl.dataset.wholeheight)
    if (height >= 837) {
        result = height * 0.765
    } else if (height >= 750) {
        result = height * 0.75
    } else if (height >= 550) {
        result = height * 0.71
    } else if (height >= 520) {
        result = height * 0.7
    }
    return result
}

function moveBookToCenter(duration) {
    const bookEl = document.getElementById('whole-book')
    const location = parseInt(bookEl.dataset.singlewidth) / 2
    anime({
        targets: '#whole-book',
        keyframes: [
            {translateX: location, easing: 'easeInCubic'},
            {translateX: 0, easing: 'easeInCubic'}
        ],
        duration: duration
    });
}

function moveBookToEnd(duration) {
    const bookEl = document.getElementById('whole-book')
    const location = parseInt(bookEl.dataset.singlewidth) / 2
    anime({
        targets: '#whole-book',
        keyframes: [
            {translateX: 0, easing: 'easeInCubic'},
            {translateX: location, easing: 'easeInCubic'}
        ],
        duration: duration
    });
}

function closeCard(duration) {
    anime({
        targets: '.book-cover',
        keyframes: [
            {rotateY: 120, easing: 'linear'},
            {rotateY: 60, easing: 'linear'},
            {rotateY: 0, easing: 'linear'}
        ],
        duration: duration
    });
}

function closeScroll(duration) {
    anime({
        targets: '.scroll-paper',
        keyframes: [
            {height: getScrollHeight(), easing: 'linear'},
            {height: 30, easing: 'linear'}
        ],
        duration: duration
    });
}

