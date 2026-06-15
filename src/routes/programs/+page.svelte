<script lang="ts">
  import { onMount } from 'svelte';
  import { animate, stagger } from 'animejs';
	import { resolve } from '$app/paths';

  const programs = [
    {
      index: '01',
      name: "'I Know a Guy,' Trades PACT",
      category: 'Trades & Construction',
      body: 'A community-rooted trades pathway built on the power of referral, reputation, and relationship. Connecting individuals to skilled trade opportunities through trusted networks — because sometimes the best door into a career is the one someone holds open for you.',
      accent: '#5DCAA5',
      wdpn: false
    },
    {
      index: '02',
      name: 'Storytelling Career Scaffolds',
      category: 'Career Development',
      body: 'Narrative is a workforce tool. This program helps individuals build their professional story — turning lived experience, nonlinear careers, and personal resilience into compelling, employer-ready communication. Because every career has a story worth telling.',
      accent: '#85B7EB',
      wdpn: false
    },
    {
      index: '03',
      name: 'Become a PA Home Improvement Contractor',
      category: 'Licensing & Trades',
      body: 'A structured pathway to Pennsylvania Home Improvement Contractor licensure — covering registration requirements, business fundamentals, insurance, and the practical knowledge needed to operate legally and successfully in the construction and renovation trades.',
      accent: '#AFA9EC',
      wdpn: false
    },
    {
      index: '04',
      name: 'Become a Career Coach / WFD Pro / Offender Employment & Youth Development Specialist',
      category: 'Workforce Development',
      body: 'A professional development pathway for those called to guide others. Building the skills, credentials, and frameworks needed to work effectively as a career coach, workforce development professional, or specialist supporting returning citizens and young people navigating barriers to employment.',
      accent: '#5DCAA5',
      wdpn: true
    },
    {
      index: '05',
      name: 'Social & Human Service Associate',
      category: 'Human Services',
      body: 'Foundational training for those entering or advancing in social and human services — developing the competencies, ethical grounding, and practical skills to support individuals and communities through complex challenges with dignity and care.',
      accent: '#85B7EB',
      wdpn: true
    },
    {
      index: '06',
      name: 'AboutFace Art Exhibits',
      category: 'Arts & Community',
      body: 'Where workforce development meets creative expression. AboutFace uses art, storytelling, and exhibition to help participants reclaim their narrative, build confidence, and present themselves to the world in ways that go beyond the resume.',
      accent: '#AFA9EC',
      wdpn: false
    }
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
    animate('.hero-label', { opacity: [0,1], translateY: [12,0], duration: 500, ease: 'outQuad' });
    animate('.hero-title', { opacity: [0,1], translateY: ['60%','0%'], duration: 900, delay: 100, ease: 'outExpo' });
    animate('.hero-body', { opacity: [0,1], translateY: [16,0], duration: 700, delay: 500, ease: 'outQuad' });
    animate('.hero-rule', { scaleX: [0,1], duration: 800, delay: 300, ease: 'outQuad' });

    // Program entries stagger in on scroll individually
    programs.forEach((_, i) => {
      onVisible(`.program-entry-${i}`, () => {
        animate(`.program-entry-${i} .entry-index`, {
          opacity: [0,1], translateX: [-12,0], duration: 400, ease: 'outQuad'
        });
        animate(`.program-entry-${i} .entry-content`, {
          opacity: [0,1], translateY: [28,0], duration: 600, delay: 80, ease: 'outQuad'
        });
      }, 0.2);
    });

    // CTA
    onVisible('.cta-section', () => {
      animate('.cta-inner', { opacity: [0,1], translateY: [20,0], duration: 700, ease: 'outQuad' });
    });
  });
</script>

<!-- Hero -->
<section class="relative min-h-[80vh] flex flex-col justify-end px-8 md:px-24 pt-36 pb-20 overflow-hidden">
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="absolute -top-24 left-0 w-175 h-125 rounded-full"
      style="background: radial-gradient(ellipse, rgba(93,202,165,0.06), transparent 65%)"></div>
    <div class="absolute bottom-0 right-0 w-100 h-100 rounded-full"
      style="background: radial-gradient(ellipse, rgba(175,169,236,0.05), transparent 65%)"></div>
  </div>

  <p class="hero-label font-heading text-xs tracking-[0.22em] uppercase mb-6 opacity-0" style="color: #5DCAA5">
    03 — Branch
  </p>

  <div class="overflow-hidden mb-8">
    <h1
      class="hero-title font-heading font-bold leading-none text-white opacity-0"
      style="font-size: clamp(3.5rem, 12vw, 10rem); letter-spacing: -0.02em"
    >Programs</h1>
  </div>

  <div class="hero-rule w-full h-px origin-left opacity-60 mb-8"
    style="background: linear-gradient(to right, rgba(93,202,165,0.6), rgba(133,183,235,0.3), transparent)"></div>

  <p class="hero-body max-w-xl text-base md:text-lg leading-relaxed opacity-0"
    style="color: rgba(210,225,220,0.6)">
    Six pathways. Each one built for a real person at a real moment — whether entering a trade, building a practice, telling their story, or stepping into service.
  </p>
</section>

<!-- Program Entries -->
<section class="px-8 md:px-24 pb-8">
  {#each programs as p, i (p.index)}
    <article
      class="program-entry-{i} grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-12 py-16 border-t"
      style="border-color: rgba(255,255,255,0.06)"
    >
      <!-- Index -->
      <div class="entry-index opacity-0 pt-1">
        <span
          class="font-heading font-bold text-sm md:text-base tabular-nums"
          style="color: {p.accent}; opacity: 0.5"
        >{p.index}</span>
      </div>

      <!-- Content -->
      <div class="entry-content opacity-0 flex flex-col gap-5">
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-xs tracking-widest uppercase" style="color: {p.accent}">{p.category}</span>
          {#if p.wdpn}
            <span
              class="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase px-2.5 py-1 rounded-full font-heading"
              style="border: 1px solid rgba(133,183,235,0.35); color: #85B7EB; background: rgba(133,183,235,0.06)"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                <circle cx="4" cy="4" r="3" fill="#85B7EB" opacity="0.7"/>
              </svg>
              WDPN Linked
            </span>
          {/if}
        </div>

        <h2
          class="font-heading text-2xl md:text-3xl text-white leading-snug"
          style="max-width: 36rem"
        >{p.name}</h2>

        <div class="h-px w-12" style="background: {p.accent}; opacity: 0.4"></div>

        <p class="text-base leading-relaxed max-w-2xl" style="color: rgba(210,225,220,0.62)">{p.body}</p>
      </div>
    </article>
  {/each}
</section>

<!-- CTA -->
<section class="cta-section px-8 md:px-24 py-28 border-t" style="border-color: rgba(255,255,255,0.06)">
  <div class="cta-inner opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-10 max-w-5xl">
    <div class="max-w-xl">
      <p class="font-heading text-xs tracking-[0.22em] uppercase mb-5" style="color: rgba(210,225,220,0.35)">
        Ready to begin
      </p>
      <p class="font-heading text-2xl md:text-3xl text-white leading-snug">
        Every pathway starts with a person. Find the one that meets you where you are.
      </p>
    </div>
    <div class="flex flex-col gap-4 shrink-0">
      <a
        href={resolve("/affiliates")}
        class="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase px-7 py-4 rounded-full transition-opacity duration-200 hover:opacity-80"
        style="border: 1px solid rgba(93,202,165,0.5); color: #5DCAA5"
      >
        Meet the Affiliates
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <a
        href={resolve("/architects")}
        class="inline-flex items-center gap-3 font-heading text-sm tracking-widest uppercase px-7 py-4 rounded-full transition-opacity duration-200 hover:opacity-70"
        style="color: rgba(210,225,220,0.4)"
      >
        Meet the Team →
      </a>
    </div>
  </div>
</section>