<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, stagger } from 'animejs';
	import { resolve } from '$app/paths';

  const leadership = [
    { initials: 'BF',  role: 'President, CEO & CEU Dean',                           name: 'Dean Feann BF',  accent: '#5DCAA5' },
    { initials: 'DF',  role: 'CTO & Vice President',                                 name: 'DF',             accent: '#85B7EB' },
    { initials: 'AF',  role: 'Chief Community Officer',                              name: 'AF',             accent: '#AFA9EC' },
    { initials: 'JA',  role: 'Lead Editor',                                          name: 'JA',             accent: '#5DCAA5' },
    { initials: 'ML',  role: 'Workforce Development Director',                       name: 'ML',             accent: '#85B7EB' },
    { initials: 'RR',  role: 'SHS Director',                                         name: 'RR',             accent: '#AFA9EC' },
    { initials: 'JB',  role: 'SOMA',                                                 name: 'JB or TBA',      accent: '#5DCAA5' },
    { initials: 'IWL', role: 'IWL #3 — Director of PACT',                           name: 'TBA',            accent: '#85B7EB' },
    { initials: 'CW',  role: 'Marketing & Communications',                           name: 'CW',             accent: '#AFA9EC' },
  ];

  const masterTrainers = [
    { initials: 'WJF', accent: '#5DCAA5' },
    { initials: 'CW',  accent: '#85B7EB' },
  ];

  function onVisible(selector: string, cb: () => void, threshold = 0.1) {
    const el = document.querySelector(selector);
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { cb(); io.disconnect(); }
    }, { threshold });
    io.observe(el);
  }

  onMount(() => {
    // Hero
    animate('.arch-label', { opacity: [0,1], translateY: [12,0], duration: 500, ease: 'outQuad' });
    animate('.arch-title', { opacity: [0,1], translateY: ['60%','0%'], duration: 900, delay: 100, ease: 'outExpo' });
    animate('.arch-rule',  { scaleX: [0,1], duration: 700, delay: 300, ease: 'outQuad' });
    animate('.arch-body',  { opacity: [0,1], translateY: [16,0], duration: 700, delay: 450, ease: 'outQuad' });

    // Leadership entries
    onVisible('.leadership-section', () => {
      animate('.leader-entry', {
        opacity: [0,1],
        translateY: [32,0],
        duration: 600,
        delay: stagger(80),
        ease: 'outQuad'
      });
    });

    // Master trainers
    onVisible('.trainers-section', () => {
      animate('.trainer-card', {
        opacity: [0,1],
        translateY: [24,0],
        duration: 500,
        delay: stagger(100),
        ease: 'outQuad'
      });
    });
  });
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] flex flex-col justify-end px-8 md:px-24 pt-36 pb-20 overflow-hidden">
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
      style="background: radial-gradient(circle, rgba(93,202,165,0.06), transparent 65%)"></div>
    <div class="absolute bottom-0 left-1/3 w-96 h-96 rounded-full"
      style="background: radial-gradient(circle, rgba(175,169,236,0.05), transparent 65%)"></div>
  </div>

  <p class="arch-label font-heading text-xs tracking-[0.22em] uppercase mb-6 opacity-0" style="color: #5DCAA5">
    01 — Branch
  </p>

  <div class="overflow-hidden mb-8">
    <h1 class="arch-title font-heading font-bold leading-none text-white opacity-0"
      style="font-size: clamp(3.5rem, 12vw, 10rem); letter-spacing: -0.02em">
      Architects
    </h1>
  </div>

  <div class="arch-rule w-full h-px origin-left mb-8 opacity-50"
    style="background: linear-gradient(to right, rgba(93,202,165,0.7), rgba(133,183,235,0.3), transparent)"></div>

  <p class="arch-body max-w-xl text-base md:text-lg leading-relaxed opacity-0"
    style="color: rgba(210,225,220,0.6)">
    The visionaries, practitioners, and builders behind Workplace Aurora — each bringing deep expertise, lived experience, and a shared commitment to creating opportunity.
  </p>
</section>

<!-- Leadership -->
<section class="leadership-section px-8 md:px-24 py-20">
  <div class="flex items-center gap-6 mb-16">
    <p class="font-heading text-xs tracking-[0.22em] uppercase whitespace-nowrap" style="color: #5DCAA5">Our Team</p>
    <div class="flex-1 h-px" style="background: linear-gradient(to right, rgba(93,202,165,0.3), transparent)"></div>
  </div>

  <div class="flex flex-col">
    {#each leadership as person (person.initials)}
      <article
        class="leader-entry opacity-0 grid grid-cols-[3.5rem_1fr] md:grid-cols-[8rem_1fr] gap-6 md:gap-12 py-8 border-t"
        style="border-color: rgba(255,255,255,0.06)"
      >
        <!-- Avatar circle -->
        <div class="flex items-start pt-1">
          <div
            class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-bold text-xs md:text-sm"
            style="background: color-mix(in srgb, {person.accent} 12%, transparent); border: 1px solid color-mix(in srgb, {person.accent} 30%, transparent); color: {person.accent}"
          >
            {person.initials}
          </div>
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-1.5">
          <p class="text-xs tracking-widest uppercase" style="color: {person.accent}">{person.role}</p>
          <p class="font-heading text-xl md:text-2xl text-white">{person.name}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<!-- Master Trainers -->
<section class="trainers-section px-8 md:px-24 py-20 border-t" style="border-color: rgba(255,255,255,0.06)">
  <div class="flex items-center gap-6 mb-14">
    <p class="font-heading text-xs tracking-[0.22em] uppercase whitespace-nowrap" style="color: #AFA9EC">Master Trainers</p>
    <div class="flex-1 h-px" style="background: linear-gradient(to right, rgba(175,169,236,0.3), transparent)"></div>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
    {#each masterTrainers as t (t.initials)}
      <div
        class="trainer-card opacity-0 relative overflow-hidden rounded-xl p-6 flex flex-col gap-3"
        style="background: linear-gradient(145deg,#0d1b2a 0%,#0a1520 100%); border: 1px solid rgba(255,255,255,0.06); border-top: 2px solid {t.accent}"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm"
          style="background: color-mix(in srgb,{t.accent} 12%,transparent); color: {t.accent}"
        >
          {t.initials}
        </div>
        <p class="font-heading text-lg text-white">{t.initials}</p>
        <p class="text-xs uppercase tracking-widest" style="color: rgba(210,225,220,0.35)">Master Trainer</p>
      </div>
    {/each}
  </div>
</section>

<!-- Closing -->
<section class="px-8 md:px-24 py-28 border-t" style="border-color: rgba(255,255,255,0.06)">
  <div class="max-w-2xl">
    <p class="font-heading text-xs tracking-[0.22em] uppercase mb-6" style="color: rgba(210,225,220,0.3)">The Foundation</p>
    <p class="font-heading text-2xl md:text-3xl text-white leading-snug mb-10">
      From Irish immigrants to ironworkers to workforce innovators — the Phelan legacy is built on perseverance, and so is this team.
    </p>
    <a href={resolve("/affiliates")}
      class="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase px-7 py-4 rounded-full transition-opacity hover:opacity-80"
      style="border: 1px solid rgba(93,202,165,0.5); color: #5DCAA5">
      Meet the Affiliates
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>
  </div>
</section>