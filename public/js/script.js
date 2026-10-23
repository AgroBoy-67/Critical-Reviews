AOS.init ({
    duration: 800, once:true
})

gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline();

gsap.to("#logo", {
    rotate: 5,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})

gsap.to(".aDoNav", {
    scale: 1.2,
    duration: 2.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})

gsap.to(".titulosLogin", {
    rotate: 2,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true
})