<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { animate, stagger } from 'animejs';
  import careerWiredImg   from '$lib/assets/career-convergence.png';
  import freedlanceImg  from '$lib/assets/freedlance-fencing.png';
  import wdpnImg from '$lib/assets/wdpn.png'

const partners = [
  {
    name: 'CareerWired',
    tag: 'Workforce Technology',
    logo: careerWiredImg,
    initials: 'CW',
    logoBg: 'light',   
  },
  {
    name: 'WDPN',
    tag: 'Career training & placement',
    logo: wdpnImg,        // no logo yet — falls back to initials
    initials: 'WD',
    logoBg: 'dark',
  },
  {
    name: 'Freedlance Fencing',
    tag: 'Construction & Trade',
    logo: freedlanceImg,
    initials: 'FF',
    logoBg: 'dark', 
  },
] as const;

  let sectionEl:   HTMLElement | null = null;
  let eyebrowEl:   HTMLElement | null = null;
  let headingEl:   HTMLElement | null = null;
  let ruleEl:      HTMLElement | null = null;
  let partnerEls:  HTMLElement[] = new Array(partners.length);
  let initialEls:  HTMLElement[] = new Array(partners.length);
  let nameEls:     HTMLElement[] = new Array(partners.length);
  let tagEls:      HTMLElement[] = new Array(partners.length);
  let numEls:      HTMLElement[] = new Array(partners.length);

  let observer: IntersectionObserver | null = null;
  let hasPlayed = false;

  function runAnimations() {

    // Eyebrow fades up
    if (eyebrowEl) animate(eyebrowEl, {
      opacity: [0, 1], translateY: [12, 0], duration: 500, ease: 'outQuad',
    });

    // Heading words split
    const words = headingEl?.querySelectorAll<HTMLElement>('.pw');
    if (words?.length) animate(words, {
      opacity: [0, 1], translateY: [36, 0],
      duration: 700, delay: stagger(90, { start: 100 }), ease: 'outQuart',
    });


    // Rule scales in from left
    if (ruleEl) animate(ruleEl, {
      scaleX: [0, 1], duration: 800, delay: 350, ease: 'outExpo',
    });

    // Partner cards wipe up one by one
    const validPartners = partnerEls.filter(Boolean);
    if (validPartners.length) animate(validPartners, {
      opacity: [0, 1], translateY: [60, 0],
      duration: 700, delay: stagger(150, { start: 500 }), ease: 'outQuart',
    });

    // Initials boxes scale in with a slight overshoot
    const validInitials = initialEls.filter(Boolean);
    if (validInitials.length) animate(validInitials, {
      scale: [0.4, 1], opacity: [0, 1],
      duration: 600, delay: stagger(150, { start: 650 }), ease: 'outBack(1.4)',
    });

    // Names slide up
    const validNames = nameEls.filter(Boolean);
    if (validNames.length) animate(validNames, {
      opacity: [0, 1], translateY: [16, 0],
      duration: 500, delay: stagger(150, { start: 750 }), ease: 'outQuad',
    });

    // Tags fade in last
    const validTags = tagEls.filter(Boolean);
    if (validTags.length) animate(validTags, {
      opacity: [0, 1],
      duration: 400, delay: stagger(150, { start: 850 }), ease: 'outQuad',
    });

    // Nums tick in
    const validNums = numEls.filter(Boolean);
    if (validNums.length) animate(validNums, {
      opacity: [0, 1], translateX: [-8, 0],
      duration: 400, delay: stagger(150, { start: 600 }), ease: 'outQuad',
    });
  }

  onMount(() => {
    // Hide everything initially
    [eyebrowEl, headingEl, ruleEl].forEach(el => {
      if (el) el.style.opacity = '0';
    });
    if (ruleEl) ruleEl.style.transformOrigin = 'left center';

    headingEl?.querySelectorAll<HTMLElement>('.pw').forEach(w => {
      w.style.opacity = '0';
    });

    [...partnerEls, ...initialEls, ...nameEls, ...tagEls, ...numEls].forEach(el => {
      if (el) el.style.opacity = '0';
    });

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasPlayed) {
          hasPlayed = true;
          observer?.disconnect();
          runAnimations();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionEl) observer.observe(sectionEl);
  });

  onDestroy(() => observer?.disconnect());

  const headingWords = ['Built', 'alongside', 'the\u00a0best.'];
</script>

<section bind:this={sectionEl} class="partners-section">

  <div class="partners-top">
    <div>
      <p class="partners-eyebrow" bind:this={eyebrowEl}>Trusted Partners</p>
      <h2 class="partners-heading" bind:this={headingEl}>
        {#each headingWords as word, i (i)}
          <span class="pw">{word}{i < headingWords.length - 1 ? '\u00a0' : ''}</span>
        {/each}
      </h2>
    </div>
  </div>

  <hr class="partners-rule" bind:this={ruleEl} />

  <ul class="partners-grid grid-cols-1 md:grid-cols-3">
    {#each partners as partner, i (partner.name)}
      <li class="partner-card border-0 py-4 first:border-l-0 last:border-r-0 md:border-r md:border-r-neutral-800 " bind:this={partnerEls[i]}>

        <p class="partner-num" bind:this={numEls[i]}>0{i + 1} —</p>

<div class="partner-logo-wrap" bind:this={initialEls[i]} aria-hidden="true">
  {#if partner.logo}
    <img
      src={partner.logo}
      alt={partner.name}
      class="partner-logo w-52 aspect-video"
     
    />
  {:else}
    <span class="partner-initials">{partner.initials}</span>
  {/if}
</div>

        <p class="partner-name" bind:this={nameEls[i]}>{partner.name}</p>
        <p class="partner-tag"  bind:this={tagEls[i]}>{partner.tag}</p>

        <div class="partner-bar"></div>
      </li>
    {/each}
  </ul>

</section>

<style>
  .partners-section {
    background: hsl(180, 11%, 7%);
    padding: 5rem 3.5rem 6rem;
    font-family: 'Barlow', 'DM Sans', sans-serif;
    font-weight: 300;
    overflow: hidden;
  }

  /* ── Top row ── */
  .partners-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .partners-eyebrow {
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5ab578;
    margin: 0 0 0.75rem;
    font-weight: 400;
  }

  .partners-heading {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #f0ebe3;
    margin: 0;
    line-height: 1.2;
  }

  :global(.partners-heading .pw) {
    display: inline-block;
    will-change: transform, opacity;
  }

  /* ── Divider ── */
  .partners-rule {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
    border: none;
    margin: 0;
    transform-origin: left center;
  }

  /* ── Grid ── */
  .partners-grid {
    display: grid;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .partner-card {
    padding: 2.5rem 2rem;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: background 0.35s ease;
    will-change: transform, opacity;
  }


  .partner-card:hover {
    background: rgba(181, 147, 90, 0.04);
  }

  /* Animated gold bottom bar on hover */
  .partner-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: #5ab578;
    transition: width 0.4s ease;
    border-radius: 0;
  }

  .partner-card:hover .partner-bar {
    width: 100%;
  }

  /* ── Card content ── */
  .partner-num {
    font-size: 11px;
    letter-spacing: 0.2em;
    color: #5ab578;
    font-weight: 400;
    margin: 0 0 1.5rem;
    will-change: transform, opacity;
  }

  .partner-initials {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(181, 147, 90, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    will-change: transform, opacity;
  }

  .partner-name {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #f0ebe3;
    margin: 0 0 0.4rem;
    will-change: transform, opacity;
  }

  .partner-tag {
    font-size: 0.75rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #5ab578;
    font-weight: 400;
    margin: 0;
    will-change: opacity;
  }

  .partner-logo-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  will-change: transform, opacity;
}



.partner-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

/* Fallback initials (for WDPN) */
.partner-initials {
  font-family: 'Playfair Display', 'Georgia', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #5ab578;
  border: 1px solid rgba(181, 147, 90, 0.25);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>