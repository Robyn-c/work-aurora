<script>
import { stagger, splitText, animate, createTimeline } from 'animejs';
import { onMount } from 'svelte';
import awowa from '$lib/assets/awowa.jpg';
onMount(() => {
  splitText('.hero__heading', {
    words: { wrap: 'clip' },
  })
  .addEffect(({ words }) => animate(words, {
    y: [
      { to: ['-100%', '0%'], ease: 'easeIn' },
    ],
    duration: 650,
    delay: stagger(100),
    loop: false,
  }));

  animate('.hero__overlay', {
    backgroundPosition: [
      '20% 20%, 80% 50%, 50% 80%',
      '40% 30%, 70% 60%, 60% 70%'
    ],
    duration: 100,
    direction: 'alternate',
    ease: 'inOutSine',
    loop: true
  });


createTimeline({
  loop: true
})
.add('.scroll-indicator', {
  y: [0, 14],
  opacity: [1, 0.8],
  duration: 1000,
  ease: 'outQuad'
})
.add('.scroll-indicator', {
  y: 0,
  opacity: 1,
  duration: 600,
  ease: 'inQuad'
});
});
</script>

<section class="hero relative px-24 py-78 bg-cover" style="background-image: url({awowa})">
  <div class="absolute inset-0 hero__overlay"></div>

  <div class="container max-w-2xl space-y-6">
    <h1 class="hero__heading text-5xl font-heading leading-tight">The Workplace Aurora: Allocating Market Forces.</h1>
    <p class="text-xl italic font-stretch-semi-expanded tracking-wide font-light">By bringing together workforce intelligence, career pathways, and employer needs, we transform complex labor market signals into clear, actionable direction.</p>
  </div>

  <!-- Scroll indicator -->
  <div class="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-default select-none">
    <span class="text-xs tracking-widest uppercase opacity-50 font-medium">Scroll</span>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-50">
      <path d="M4 7L10 13L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- TODO: BLEND THE BACKGROUND INTO THE NEXT SECTION !!!!! -->
</section>

<style>
.hero {
  background-color: var(--background);
  background-blend-mode: hard-light;
}
.hero__overlay {
  background-size: 200% 200%;
  background:
    radial-gradient(
      circle at 20% 20%,
      rgba(0,255,150,.15),
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 50%,
      rgba(0,200,255,.15),
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 80%,
      rgba(100,255,150,.1),
      transparent 40%
    );
}
</style>