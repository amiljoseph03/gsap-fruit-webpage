document.addEventListener('DOMContentLoaded', () => {
 
  if (window.gsap) {
    const toRegister = [
      window.ScrollTrigger,
      window.MotionPathPlugin,
      window.Draggable,
    ];
    if (window.InertiaPlugin) toRegister.push(window.InertiaPlugin);
    gsap.registerPlugin(...toRegister);
  } else {
    console.error('GSAP not found. Load GSAP before script.js');
    return;
  }


  if (window.Lenis) {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }


  ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: `+=${window.innerHeight * 4}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      const imgs = gsap.utils.toArray('.images .mask-img');
      const total = imgs.length || 1;
      const segment = 1 / total;

      imgs.forEach((img, index) => {
        const start = index * segment;
        const end = (index + 1) * segment;

        let p = 0;
        if (progress >= start && progress <= end) {
          p = (progress - start) / segment;
        } else if (progress > end) {
          p = 1;
        }

        const left = 50 - p * 50;
        const right = 50 + p * 50;
        const deg = 90 + p * 40;
        const gradient = `linear-gradient(${deg}deg, black ${left}%, transparent ${left}%, transparent ${right}%, black ${right}%)`;

        gsap.set(img, {
          maskImage: gradient,
          webkitMaskImage: gradient, 
        });
      });
    },
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh(), {
    passive: true,
  });

});




// section3

gsap.registerPlugin(SplitText);

let split, animation;

function setup() {
  split && split.revert();
  animation && animation && animation.revert();

  split = SplitText.create('.container3 .text', {
    type: 'chars,words,lines',
    linesClass: 'line',
  });

  animation = gsap.from(split.lines, {
    y: '120%',
    duration: 1.2,
    ease: 'power3.out',
    stagger: 0.1,
    yoyo: true,
    repeat: -1,
  });
}

setup();
window.addEventListener('resize', setup);

