<script>
import { stagger, splitText, animate } from 'animejs';
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
  });
</script>

  <section class="hero relative px-24 py-78 bg-cover" style="background-image: url({awowa})">
  <div class="absolute inset-0 hero__overlay"></div>
<div class="container max-w-2xl space-y-6">
      <h1 class="hero__heading text-5xl font-heading leading-tight">The Workplace Aurora: Allocating Market Forces.</h1>
      <p class="text-xl italic font-stretch-semi-expanded tracking-wide font-light">By bringing together workforce intelligence, career pathways, and employer needs, we transform complex labor market signals into clear, actionable direction.</p>

    </div>
    <!-- TODO: BLEND THE BACKGROUND INTO THE NEXT SECTION !!!!! ----> 
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
