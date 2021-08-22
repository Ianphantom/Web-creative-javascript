let controller;
let slideScene;
let pageScene;

function animateSlides(){
    controller = new ScrollMagic.Controller(); 
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    sliders.forEach((slide,index,slides) => {
        const revealImg = slide.querySelector('.reveal-image');
        const img = slide.querySelector('img');
        const reavealText = slide.querySelector('.reveal-text');

        const slideT1 = gsap.timeline({default:{duration: 1, ease: 'power2.inOut'}})
        slideT1.fromTo(revealImg, {x: '0%'}, {x:'100%'});
        slideT1.fromTo(img, {scale:2}, {scale:1}, '-=0.5');
        slideT1.fromTo(reavealText, {x:'0%'}, {x:'100%'}, "-=0.2")
        slideT1.fromTo(nav, {y:'-100%'}, {y:'0%'}, "-=0.5")

        slideScene = new ScrollMagic.Scene({
            triggerElement : slide,
            triggerHook: 0.19
        })
        .setTween(slideT1)
        .addIndicators({colorStart:'white', colorTrigger:'white', name:"slide"})
        .addTo(controller);

        const pageT1 = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? 'end' : slides[index+1];
        pageT1.fromTo(nextSlide, {y:'0%'}, {y:'50%'})
        pageT1.fromTo(slide, {opacity:1, scale:1}, {opacity:0, scale:0.5})
        pageT1.fromTo(nextSlide, {y:'50%'}, {y:'0%'}, "-=0.5")
        pageScene = new ScrollMagic.Scene({
            triggerElement:slide,
            duration: '100%',
            triggerHook: 0
        })
        .addIndicators({colorStart:'white', colorTrigger:'white', name:"page", indent:200})
        .setPin(slide, {pushFollowers:false})
        .setTween(pageT1)
        .addTo(controller)
    })
}
const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');
const burger = document.querySelector('.burger')
function cursor(e){
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function acticeCursor(e){
    const item = e.target;
    if(item.id === 'logo' || item.classList.contains('burger')){
        mouse.classList.add('nav-active')
    }else{
        mouse.classList.remove('nav-active')
    }

    if(item.classList.contains('explore')){
        mouse.classList.add('explore-active');
        gsap.to('.title-swipe',1, {y:'0%'})
        mouseTxt.innerText = 'Tap';
    }else{
        mouse.classList.remove('explore-active');
        gsap.to('.title-swipe',1, {y:'100%'})
        mouseTxt.innerText = '';
    }
}

function navToggle(e){
    if(!e.target.classList.contains('active')){
        e.target.classList.add('active');
        gsap.to('.line1', 0.5, {rotate: "45", y:5, background:"black"});
        gsap.to('.line2', 0.2, {rotate: "-45", y:-5, background:"black"})
        gsap.to('#logo', 1, {color:"black"})
        gsap.to('.nav-bar', 1, {clipPath : 'circle(2500px at 100% -10%)'})
        document.body.classList.add("hide");
    }else{
        e.target.classList.remove('active');
        gsap.to('.line1', 0.5, {rotate: "0", y:0, background:"white"});
        gsap.to('.line2', 0.2, {rotate: "0", y:0, background:"white"})
        gsap.to('#logo', 1, {color:"white"})
        gsap.to('.nav-bar', 1, {clipPath : 'circle(50px at 100% -10%)'})
        document.body.classList.remove("hide");
    }
}

burger.addEventListener('click',navToggle)
window.addEventListener('mousemove', cursor)
window.addEventListener('mouseover', acticeCursor);
animateSlides();