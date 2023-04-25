function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('elem_show');
        }
        // else {
        //     change.target.classList.remove('elem_show');
        // }
    });
}

let options = {threshold: [0.5]};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.elem_anim');
for (let elm of elements) {
    observer.observe(elm);
}
/* ------------------------------------ */
const menuLinks = document.querySelectorAll('.menu .menu_link')
const generalMenuLinks = document.querySelectorAll('.general_menu .menu_link')
const header = document.querySelector('.header_inner')
const pages = document.querySelectorAll('.page')
const wrapper = document.querySelector('section')
const generalMenu = document.querySelector('.general_menu')
const burger = document.querySelector('.burger_menu')
const popups = document.querySelectorAll('.popup_wrapper')
const videoBtns = document.querySelectorAll('.videos_item__play, .video_btn')


const pageSlider = new Swiper('.wrapper', {
    wrapperClass: 'pages',
    slideClass: 'page',
    direction: 'vertical',
    speed: 800,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true
    },
    mousewheel: {
        sensitivity: 1
    },
    slidesPerView:true,
    watchOverflow: true,
    // allowTouchMove: false,
    // freeMode: true,
    breakpoints:{
        320:{
            autoHeight:true,
        },
        600:{
            autoHeight:false,
        },

    },
    pagination: {
        el: '.pagination',
        type: 'bullets',
        clickable: true,
        bulletClass: 'bullet',
        bulletActiveClass: 'active',
        renderBullet:(index,className) => `<button class="${className}" ${index === 2 || index === 4 ? 'style="display:none"' : ''}></button>`,
    },
    init: false,
    on: {
        init: function () {
            menuActive()
            setScrollType()
        },
        slideChange: function () {
            menuActive()
            if (pageSlider.realIndex > 0 && pageSlider.realIndex !== 4) header.classList.add('light')
            else header.classList.remove('light')
            setScrollType()
        },
        resize: function () {
            setScrollType()
        }
    },
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    scrollbar:{
        el:'.page_scroll',
        dragClass: 'page_scroll__drag',
        draggable:true
    }
})

for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
        pageSlider.slideTo(i)
        generalMenu.classList.remove('active')
        burger.classList.remove('active')
    })
    generalMenuLinks[i] && generalMenuLinks[i].addEventListener('click', () => {
        pageSlider.slideTo(i)
        generalMenu.classList.remove('active')
        burger.classList.remove('active')
    })
}
/*---------------------*/

function menuActive() {
    const activeSlide = pageSlider.realIndex
    menuLinks.forEach(el => {
        el.classList.remove('active')
    })
    generalMenuLinks.forEach(el => {
        el.classList.remove('active')
    })
    if (pages[activeSlide].classList.contains('product')) {
        menuLinks[1].classList.add('active')
        generalMenuLinks[1].classList.add('active')
    }
    for (let i = 0; i < menuLinks.length; i++) {
        const menuLink = menuLinks[i]
        const generalMenuLink = generalMenuLinks[i]
        if (i === activeSlide) {
            menuLink.classList.add('active')
            generalMenuLink.classList.add('active')
        }
    }
}

const headerLogo = document.querySelector('.header_logo')
headerLogo.addEventListener('click', () => {
    pageSlider.slideTo(0)
})

window.addEventListener('click',(event) => {
    if(event.target.parentNode.classList.contains('burger') ||event.target.classList.contains('burger') ){
         generalMenu.classList.toggle('active')
         burger.classList.toggle('active')
    }else {
        if(!event.target.parentNode.classList.contains('general_menu') && !event.target.parentNode.classList.contains('burger_menu')) {
            generalMenu.classList.remove('active')
            burger.classList.remove('active')
        }
    }
})


function setScrollType() {
    if (wrapper.classList.contains('_free')) {
        wrapper.classList.remove('_free');
        pageSlider.params.freeMode.enabled = false;
    }
    // if(window.innerWidth <= 768){
    //     pageSlider.params.freeMode.enabled = true;
    // }
    for (let index = 0; index < pageSlider.slides.length; index++) {
        const pageSlide = pageSlider.slides[index];
        const pageSlideContent = pageSlide.querySelector('section');
        if (pageSlideContent) {
            const pageSlideContentHeight = pageSlideContent.offsetHeight;
            if (pageSlideContentHeight > window.innerHeight) {

                wrapper.classList.add('_free');
                pageSlider.params.freeMode.enabled = true;
                break;
            }
        }
    }
}


pageSlider.init()


const videosSlider = new Swiper('.videos_slider',{
    wrapperClass: 'videos_items',
    slideClass: 'videos_item',
    init:false,
    loop:true,
    touch: true,
    allowTouchMove:true,
    breakpoints: {
        990:{
            enabled:false,
            slidesPerView: 3
        }
    }
})

videosSlider.init()

/* -------------------------------------------- */

const src = "https://www.youtube.com/embed/vkab3w9zeI8"

const langMode = document.querySelector('.header_lang h3')
const langItems = document.querySelectorAll('.header_lang__items span')
const popupVideos = document.querySelectorAll('.popup_video iframe')

langItems.forEach((node) => {
    node.addEventListener('click',() => {
        langItems.forEach(el => el.classList.remove('active'))
        node.classList.add('active')
        langMode.innerHTML = node.innerHTML
    })
})

for (let i = 0; i < videoBtns.length; i++) {
    const btn = videoBtns[i]
    const popup = popups[i]
    btn.addEventListener('click',() => {
        popup.classList.add('active')
        popupVideos.forEach(el => {
            el.setAttribute('src',src)
        })
    })
    popup.addEventListener('click',() => {
        if(!event.target.classList.contains('popup') && (!event.target.classList.contains('popup_title') && !event.target.classList.contains('popup_content') && !event.target.parentNode.classList.contains('popup_content'))){
            popup.classList.remove('active')
            popupVideos.forEach(el => {
                el.setAttribute('src','')
            })
        }
    })
}
