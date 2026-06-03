<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { animate, stagger } from 'animejs';

  import steelImg from '$lib/assets/steel-mills.jpg';
  import streetImg from '$lib/assets/pittsburgh-street.jpeg';

  let sectionEl: HTMLElement | null = null;
  let headlineEl: HTMLElement | null = null;
  let ruleEl: HTMLElement | null = null;
  let eyebrowEl: HTMLElement | null = null;
  let calloutEl: HTMLElement | null = null;
  let closingEl: HTMLElement | null = null;
  let photo1El: HTMLElement | null = null;
  let photo2El: HTMLElement | null = null;
  let overlayEl: HTMLElement | null = null;

  // Fixed: plain indexed arrays, assigned in the markup via bind:this={proseEls[i]}
  let proseEls: HTMLElement[] = new Array(2);
  let principleEls: HTMLElement[] = new Array(3);

  let intersectionObserver: IntersectionObserver | null = null;
  let hasPlayed = false;

  const headlineWords = 'Built on Resilience. Driven by Integrity.'.split(' ');

  const principles = [
    { title: 'Build with integrity',    desc: 'Every structure, deal, and decision reflects who we are.' },
    { title: 'Protect original ideas',  desc: 'Innovation deserves to be owned and defended.' },
    { title: 'Create lasting impact',   desc: 'We build for the generations that come after us.' },
  ] as const;

  function runAnimations() {
    // Photos wipe in from opposite edges
    if (photo1El) animate(photo1El, {
      clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
      duration: 1000, ease: 'outExpo',
    });

    if (photo2El) animate(photo2El, {
      clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)'],
      duration: 1000, delay: 150, ease: 'outExpo',
    });

    // Overlay fades in over photos
    if (overlayEl) animate(overlayEl, {
      opacity: [0, 1],
      duration: 800, delay: 600, ease: 'outQuad',
    });

    // Eyebrow
    if (eyebrowEl) animate(eyebrowEl, {
      opacity: [0, 1], translateY: [16, 0],
      duration: 600, delay: 500, ease: 'outQuad',
    });

    // Rule scales out from left
    if (ruleEl) animate(ruleEl, {
      scaleX: [0, 1],
      duration: 600, delay: 700, ease: 'outExpo',
    });

    // Headline words stagger up
    const words = headlineEl?.querySelectorAll<HTMLElement>('.word');
    if (words?.length) {
      animate(words, {
        opacity: [0, 1], translateY: [40, 0],
        duration: 700,
        delay: stagger(80, { start: 600 }),
        ease: 'outQuart',
      });
    }

    // Prose paragraphs
    const validProse = proseEls.filter(Boolean);
    if (validProse.length) animate(validProse, {
      opacity: [0, 1], translateY: [24, 0],
      duration: 700,
      delay: stagger(160, { start: 900 }),
      ease: 'outQuad',
    });

    // Callout slides in from left
    if (calloutEl) animate(calloutEl, {
      opacity: [0, 1], translateX: [-32, 0],
      duration: 700, delay: 1200, ease: 'outQuart',
    });

    // Principles stagger up
    const validPrinciples = principleEls.filter(Boolean);
    if (validPrinciples.length) animate(validPrinciples, {
      opacity: [0, 1], translateY: [32, 0],
      duration: 600,
      delay: stagger(120, { start: 1350 }),
      ease: 'outQuart',
    });

    // Closing
    if (closingEl) animate(closingEl, {
      opacity: [0, 1], translateY: [16, 0],
      duration: 600, delay: 1700, ease: 'outQuad',
    });
  }

  onMount(() => {
    // Set initial hidden state imperatively
    const toHide: (HTMLElement | null)[] = [
      eyebrowEl, ruleEl, calloutEl, closingEl,
      ...proseEls, ...principleEls,
    ];
    toHide.forEach(el => {
      if (el) el.style.opacity = '0';
    });

    if (ruleEl) ruleEl.style.transformOrigin = 'left center';
    if (overlayEl) overlayEl.style.opacity = '0';
    if (photo1El) photo1El.style.clipPath = 'inset(0 100% 0 0)';
    if (photo2El) photo2El.style.clipPath = 'inset(0 0 0 100%)';

    headlineEl?.querySelectorAll<HTMLElement>('.word').forEach(w => {
      w.style.opacity = '0';
    });

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayed) {
          hasPlayed = true;
          intersectionObserver?.disconnect();
          runAnimations();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionEl) intersectionObserver.observe(sectionEl);
  });

  onDestroy(() => {
    intersectionObserver?.disconnect();
  });
</script>

<section bind:this={sectionEl} class="story-section">

  <div class="story-photos">
    <div class="story-photo" bind:this={photo1El} style="background-image: url({steelImg})">
      <span class="photo-label">Pittsburgh, PA — Steel Era</span>
    </div>
    <div class="story-photo" bind:this={photo2El} style="background-image: url({streetImg})">
      <span class="photo-label">Downtown Pittsburgh — c. 1930s</span>
    </div>
    <div class="photo-overlay" bind:this={overlayEl}></div>
  </div>

  <div class="story-body">

    <p class="story-eyebrow" bind:this={eyebrowEl}>Our Story</p>

    <h2 class="story-headline" bind:this={headlineEl}>
      {#each headlineWords as word, i (i)}
        <span class="word">{word}{i < headlineWords.length - 1 ? '\u00a0' : ''}</span>
      {/each}
    </h2>

    <hr class="story-rule" bind:this={ruleEl} />

    <p class="story-prose" bind:this={proseEls[0]}>
      From Irish immigrants seeking a better future to generations of builders, ironworkers,
      and innovators in Pittsburgh, the Phelan legacy is a story of perseverance.
    </p>

    <p class="story-prose" bind:this={proseEls[1]}>
      What began as a family's journey across the Atlantic became a century-long commitment
      to hard work, self-reliance, and creating opportunity for others.
    </p>

    <div class="story-callout" bind:this={calloutEl}>
      <p>Today, those same principles guide our mission.</p>
    </div>

    <div class="story-principles">
      {#each principles as principle, i (principle.title)}
        <div class="principle" bind:this={principleEls[i]}>
          <svg class="principle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            {#if i === 0}
              <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11"/>
            {:else if i === 1}
              <path d="M12 3l1.88 5.76H20l-4.94 3.58 1.88 5.76L12 14.52l-4.94 3.58 1.88-5.76L4 8.76h6.12z"/>
            {:else}
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/>
            {/if}
          </svg>
          <p class="principle-title">{principle.title}</p>
          <p class="principle-desc">{principle.desc}</p>
        </div>
      {/each}
    </div>

    <p class="story-closing" bind:this={closingEl}>
      The past shaped the foundation.
      <em>The future is what we build next.</em>
    </p>

  </div>
</section>

<style>
  .story-section {
    font-family: 'Quicksand', 'DM Sans', sans-serif;
    font-weight: 300;
    background: hsl(180, 11%, 7%);
    color: #d4cfc8;
    overflow: hidden;
  }

  .story-photos {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 420px;
    gap: 3px;
    background: #0b0e0c;
  }

  .story-photo {
    position: relative;
    background-size: cover;
    background-position: center;
    filter: sepia(25%) contrast(1.05) brightness(0.65);
    overflow: hidden;
    will-change: clip-path;
  }

  .photo-label {
    position: absolute;
    bottom: 14px;
    left: 16px;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(212, 207, 200, 0.5);
  }

  .photo-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(14, 13, 11, 0.6) 80%,
      #0e0d0b 100%
    );
  }

  .story-body {
    padding: 3.5rem 4rem 5rem;
    
    margin: 0 auto;
  }

  .story-eyebrow {
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: #5ab578;
    margin: 0 0 1.5rem;
    font-weight: 400;
  }

  .story-headline {
    font-family: 'Quicksand', 'Georgia', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #f0ebe3;
    line-height: 1.15;
    margin: 0 0 1.75rem;
    letter-spacing: -0.015em;
  }

  /* :global needed since .word lives inside a Svelte each block */
  :global(.story-headline .word) {
    display: inline-block;
    will-change: transform, opacity;
  }

  .story-rule {
    width: 52px;
    height: 2px;
    background: #5ab578;
    border: none;
    margin: 0 0 2.5rem;
    transform-origin: left center;
  }

  .story-prose {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #8a847c;
    margin: 0 0 1.5rem;
  }

  .story-callout {
    border-left: 2px solid #5ab578;
    padding: 1.1rem 0 1.1rem 1.75rem;
    margin: 2.25rem 0;
  }

  .story-callout p {
    font-family: 'Quicksand', 'Georgia', serif;
    font-style: italic;
    font-size: 1.25rem;
    color: #d4cfc8;
    line-height: 1.6;
    margin: 0;
  }

  .story-principles {
    display: flex;
    gap: 0;
    margin-top: 2.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    padding: 2rem 0;
  }

  .principle {
    flex: 1;
    padding: 0 1.75rem;
    border-right: 1px solid rgba(255, 255, 255, 0.07);
    will-change: transform, opacity;
  }

  .principle:first-child { padding-left: 0; }
  .principle:last-child  { border-right: none; padding-right: 0; }

  .principle-icon {
    width: 22px;
    height: 22px;
    color: #5ab578;
    margin-bottom: 0.75rem;
    display: block;
  }

  .principle-title {
    font-family: 'Quicksand', 'Georgia', serif;
    font-size: 1rem;
    font-weight: 700;
    color: #f0ebe3;
    margin: 0 0 0.4rem;
  }

  .principle-desc {
    font-size: 0.82rem;
    color: #5ab578;
    line-height: 1.6;
    margin: 0;
  }

  .story-closing {
    margin-top: 2.5rem;
    font-size: 0.95rem;
    color: #5ab578;
    line-height: 1.8;
    margin-bottom: 0;
  }

  .story-closing em {
    display: block;
    font-family: 'Playfair Display', 'Georgia', serif;
    font-style: italic;
    font-size: 1.15rem;
    color: #c4bfb8;
    margin-top: 0.35rem;
  }
</style>