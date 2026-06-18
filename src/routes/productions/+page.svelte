<script lang="ts">
  import { onMount } from 'svelte';
  import { animate } from 'animejs';

  const films = [
    {
      index: '01',
      title: 'Phelan 2 BFreed',
      tagline: 'A story of legacy, liberation, and what it means to build something that lasts.',
      genre: 'Documentary',
      accent: '#5DCAA5',
      gradient: 'radial-gradient(ellipse at 30% 60%, rgba(93,202,165,0.12), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(93,202,165,0.06), transparent 50%)'
    },
    {
      index: '02',
      title: "Hope's Popes",
      tagline: 'Faith, community, and the quiet leaders who hold neighborhoods together.',
      genre: 'Documentary',
      accent: '#85B7EB',
      gradient: 'radial-gradient(ellipse at 70% 40%, rgba(133,183,235,0.12), transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(133,183,235,0.06), transparent 50%)'
    },
    {
      index: '03',
      title: 'The Rev and Curb Qpprap',
      tagline: 'Street wisdom meets institutional change — where the curb and the pulpit finally speak the same language.',
      genre: 'Documentary',
      accent: '#AFA9EC',
      gradient: 'radial-gradient(ellipse at 50% 30%, rgba(175,169,236,0.12), transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(175,169,236,0.06), transparent 50%)'
    }
  ];

  onMount(() => {
    // Hero
    animate('.prod-hero-label', { opacity: [0,1], translateY: [10,0], duration: 500, ease: 'outQuad' });
    animate('.prod-hero-title', { opacity: [0,1], translateY: ['50%','0%'], duration: 900, delay: 100, ease: 'outExpo' });
    animate('.prod-hero-sub', { opacity: [0,1], duration: 700, delay: 500, ease: 'outQuad' });

    // Each film panel — observe and animate on enter
    films.forEach((_, i) => {
      const el = document.querySelector(`.film-panel-${i}`);
      if (!el) return;
      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          animate(`.film-panel-${i} .film-index`, { opacity: [0,1], translateX: [-20,0], duration: 500, ease: 'outQuad' });
          animate(`.film-panel-${i} .film-genre`, { opacity: [0,1], translateY: [10,0], duration: 400, delay: 100, ease: 'outQuad' });
          animate(`.film-panel-${i} .film-title`, { opacity: [0,1], translateY: ['40%','0%'], duration: 800, delay: 150, ease: 'outExpo' });
          animate(`.film-panel-${i} .film-rule`, { scaleX: [0,1], duration: 600, delay: 400, ease: 'outQuad' });
          animate(`.film-panel-${i} .film-tagline`, { opacity: [0,1], translateY: [16,0], duration: 600, delay: 500, ease: 'outQuad' });
          io.disconnect();
        }
      }, { threshold: 0.25 });
      io.observe(el);
    });
  });
</script>

<!-- Hero -->
<section class="relative min-h-[50vh] flex flex-col justify-end px-8 md:px-24 pt-36 pb-16 overflow-hidden border-b" style="border-color: rgba(255,255,255,0.06)">
  <div class="pointer-events-none absolute inset-0" aria-hidden="true"
    style="background: radial-gradient(ellipse at 20% 80%, rgba(93,202,165,0.05), transparent 55%)"></div>

  <p class="prod-hero-label font-heading text-xs tracking-[0.22em] uppercase mb-6 opacity-0" style="color: #5DCAA5">
    04 — Branch
  </p>
  <div class="overflow-hidden mb-4">
    <h1 class="prod-hero-title font-heading font-bold leading-none text-white opacity-0"
      style="font-size: clamp(3.5rem, 12vw, 10rem); letter-spacing: -0.02em">
      Productions
    </h1>
  </div>
  <p class="prod-hero-sub text-base md:text-lg max-w-lg leading-relaxed opacity-0"
    style="color: rgba(210,225,220,0.5)">
    Films rooted in the Aurora mission — amplifying stories of resilience, community, and transformation.
  </p>
</section>

<!-- Film Panels -->
{#each films as film, i}
  <section
    class="film-panel-{i} relative min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 overflow-hidden border-b"
    style="border-color: rgba(255,255,255,0.04)"
  >
    <!-- Cinematic background glow -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true"
      style="background: {film.gradient}"></div>

    <!-- Subtle grain texture overlay -->
    <div class="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true"
      style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%221%22/></svg>')"></div>

    <!-- Index — top right watermark -->
    <span class="film-index pointer-events-none select-none absolute top-12 right-12 font-heading font-bold opacity-0"
      style="font-size: clamp(5rem, 15vw, 12rem); color: {film.accent}; opacity: 0; line-height:1; letter-spacing:-0.04em">
      {film.index}
    </span>

    <div class="relative max-w-4xl">
      <p class="film-genre font-heading text-xs tracking-[0.3em] uppercase mb-8 opacity-0" style="color: {film.accent}">
        {film.genre}
      </p>

      <div class="overflow-hidden mb-8">
        <h2 class="film-title font-heading font-bold text-white leading-none opacity-0"
          style="font-size: clamp(2.8rem, 8vw, 7rem); letter-spacing: -0.02em">
          {film.title}
        </h2>
      </div>

      <div class="film-rule h-px w-16 origin-left mb-8" style="background: {film.accent}; opacity: 0.5"></div>

      <p class="film-tagline text-lg md:text-xl leading-relaxed max-w-xl opacity-0"
        style="color: rgba(210,225,220,0.6); font-style: italic">
        {film.tagline}
      </p>
    </div>
  </section>
{/each}

<!-- Closing -->
<section class="px-8 md:px-24 py-28">
  <div class="max-w-2xl">
    <p class="font-heading text-xs tracking-[0.22em] uppercase mb-6" style="color: rgba(210,225,220,0.3)">The Work</p>
    <p class="font-heading text-2xl md:text-3xl text-white leading-snug mb-10">
      Every production is a workforce story told differently — through film, faith, and the voices that don't always make it into the data.
    </p>
    <a href="/" class="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase transition-opacity hover:opacity-70"
      style="color: rgba(210,225,220,0.4)">
      ← Back to Aurora
    </a>
  </div>
</section>