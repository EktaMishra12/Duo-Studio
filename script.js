function init() {
    gsap.registerPlugin(ScrollTrigger);

    const isDesktop = window.innerWidth > 768;
    const scrollContainer = document.querySelector(".main");

    if (isDesktop) {
        const locoScroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true
        });

        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: scrollContainer.style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    }

    ScrollTrigger.refresh();
}

init();

// Reuse across triggers
const isDesktop = window.innerWidth > 768;
const scroller = isDesktop ? ".main" : undefined;

// Cursor on desktop only
if (isDesktop) {
    const crsr = document.querySelector(".cursor");
    document.addEventListener("mousemove", function (dets) {
        crsr.style.left = dets.x + 20 + "px";
        crsr.style.top = dets.y + 20 + "px";
    });

    const boxes = document.querySelectorAll(".box");
    boxes.forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            const att = elem.getAttribute("data-image");
            crsr.style.width = "300px";
            crsr.style.height = "250px";
            crsr.style.borderRadius = "0";
            crsr.style.backgroundImage = `url(${att})`;
        });

        elem.addEventListener("mouseleave", function () {
            crsr.style.width = "20px";
            crsr.style.height = "20px";
            crsr.style.borderRadius = "50%";
            crsr.style.backgroundImage = `none`;
        });
    });
} else {
    document.querySelector(".cursor").style.display = "none";
}

// Purple hover
const h4s = document.querySelectorAll("#nav h4");
const purple = document.querySelector("#purple");
const nav = document.querySelector("#nav");

h4s.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        purple.style.display = "block";
        purple.style.opacity = "1";
    });
});
nav.addEventListener("mouseleave", function () {
    purple.style.display = "none";
    purple.style.opacity = "0";
});

// ===== GSAP Scroll Animations =====

// Animate text on load
gsap.from(".page1 h1, .page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.2,
    duration: 0.3
});

// 1. Text & video move on scroll
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: scroller,
        start: "top 27%",
        end: "top 0%",
        scrub: true
    }
});
tl.to(".page1 h1", { x: -1500, ease: "expo.in" }, "same");
tl.to(".page1 h2", { x: 1500, ease: "expo.in" }, "same");
tl.to(".page1 video", { width: "90%", scale: 1.2 }, "same");

// 2. Background turns white
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: scroller,
        start: "top -115%",
        end: "top -120%",
        scrub: 3
    }
});
tl2.to(".main", { backgroundColor: "#ffffff" });

// 3. Background turns black again
const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: scroller,
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
});
tl3.to(".main", { backgroundColor: "#000000" });
