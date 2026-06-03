<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { animate, createTimeline } from 'animejs';

	const items = [
		{
			title: 'Solar Winds',
			body: 'Just as solar winds power the northern lights, labor market forces drive economic opportunity. Changes in hiring demand, industry growth, technological advancement, and workforce availability create the conditions that shape careers and businesses alike. Understanding these signals allows organizations and individuals to anticipate change rather than react to it.'
		},
		{
      title: 'Magnetic Field',
      body: 'Opportunity emerges when education, training, employers, and workers move in the same direction. Structural alignment ensures that workforce investments are connected to real-world outcomes, creating pathways that benefit both employers and the people they hire.When systems work together, talent flows where it is needed most.'
		},
		{
      title: 'Atmosphere',
      body: 'Behind every workforce statistic is a person seeking growth, purpose, and economic mobility. Human potential is the atmosphere through which opportunity becomes visible. Skills, determination, and access to the right resources allow individuals to transform market demand into meaningful careers. The strongest workforce systems recognize that success is built by people, not numbers.'
		}
	];

	const colors = ['#5DCAA5', '#85B7EB', '#AFA9EC'] as const;

	let pathEls: (SVGPathElement | null)[] = [null, null, null];
	let sectionEl: HTMLElement | null = null;
	let svgEl: SVGSVGElement | null = null;
	let targetTextEl: HTMLHeadingElement | null = null;
	let itemEls: (HTMLLIElement | null)[] = [null, null, null];

	let loopInstances: ReturnType<typeof animate>[] = [];
	let resizeObserver: ResizeObserver | null = null;
	let intersectionObserver: IntersectionObserver | null = null;

	function buildPath(x1: number, y1: number, x2: number, y2: number): string {
		const dx = x2 - x1;
		const cp1x = x1 + dx * 0.7;
		const cp1y = y1;
		const cp2x = x2 - dx * 0.15;
		const cp2y = y2;
		return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
	}

	function updatePaths(): void {
		if (!svgEl || !targetTextEl) return;
		const svgRect = svgEl.getBoundingClientRect();
		const targetRect = targetTextEl.getBoundingClientRect();

		const tx = targetRect.left - svgRect.left;
		const ty = targetRect.top - svgRect.top + targetRect.height / 2;

		itemEls.forEach((el, i) => {
			const path = pathEls[i];
			if (!el || !path) return;
			const itemRect = el.getBoundingClientRect();
			const x1 = itemRect.right - svgRect.left;
			const y1 = itemRect.top - svgRect.top + itemRect.height / 2;
			path.setAttribute('d', buildPath(x1, y1, tx, ty));
		});
	}

	function startLoopAnimation(path: SVGPathElement, i: number): void {
		path.style.strokeDasharray = '10 6';
		path.style.strokeDashoffset = '0';

		const inst = animate(path, {
			strokeDashoffset: { to: -32 },
			duration: 1400 + i * 180,
			ease: 'linear',
			loop: true
		});
		loopInstances.push(inst);
	}

	function runIntro(): void {
		loopInstances.forEach((a) => a.pause());
		loopInstances = [];

		const validCards = itemEls.filter(Boolean) as HTMLLIElement[];
		animate(validCards, {
			opacity: [0, 1],
			translateX: [-80, 0],
			duration: 600,
			ease: 'outQuad',
			stagger: 200,
		});

		const tl = createTimeline({ defaults: { ease: 'inOutQuad' } });

		pathEls.forEach((path, i) => {
			if (!path) return;
			const len = path.getTotalLength();
			path.style.strokeDasharray = `${len}`;
			path.style.strokeDashoffset = `${len}`;

			const card = itemEls[i];

			tl.add(
				path,
				{
					delay: 200 + i * 300,
					strokeDashoffset: { to: 0 },
					duration: 800,
					onComplete: () => startLoopAnimation(path, i)
				},
				i * 160
			);

			if (card) {
				tl.add(
					card,
					{
						scale: [
							{ to: 1.05, duration: 300, ease: 'outSine' },
							{ to: 1, duration: 300, ease: 'inSine' }
						],
						delay: 200 + i * 300
					},
					i * 160
				);
			}
		});
	}

	onMount(() => {
		// Hide cards initially
		itemEls.forEach((el) => {
			if (el) {
				el.style.opacity = '0';
				el.style.transform = 'translateX(-80px)';
			}
		});

		updatePaths();
		resizeObserver = new ResizeObserver(() => updatePaths());
		if (sectionEl) resizeObserver.observe(sectionEl);

		let hasPlayed = false;

		intersectionObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasPlayed) {
					hasPlayed = true;
					intersectionObserver?.disconnect();
					runIntro();
				}
			},
			{ threshold: 0.4 }
		);

		if (sectionEl) intersectionObserver.observe(sectionEl);
	});

	onDestroy(() => {
		loopInstances.forEach((a) => a.pause());
		resizeObserver?.disconnect();
		intersectionObserver?.disconnect();
	});
</script>

<section class="relative px-24 py-12" bind:this={sectionEl}>
	<h2 class="mb-8 font-heading text-3xl">What Makes the Aurora?</h2>

	<svg
		bind:this={svgEl}
		class="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
		aria-hidden="true"
	>
		<defs>
			{#each colors as color, i (color)}
				<marker
					id="arrowhead-{i}"
					viewBox="0 0 10 10"
					refX="8"
					refY="5"
					markerWidth="6"
					markerHeight="6"
					orient="auto-start-reverse"
				>
					<path
						d="M2 1L8 5L2 9"
						fill="none"
						stroke={color}
						stroke-width="1.8"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</marker>
			{/each}
		</defs>

		{#each colors as color, i (color)}
			<path
				bind:this={pathEls[i]}
				d=""
				fill="none"
				stroke={color}
				stroke-width="2"
				stroke-linecap="round"
				opacity="0.85"
				marker-end="url(#arrowhead-{i})"
			/>
		{/each}
	</svg>

	<ul class="grid grid-cols-2 grid-rows-3 items-center justify-center gap-8">
		{#each items as item, i (item.title)}
<li
  class="relative overflow-hidden rounded-xl p-8 space-y-4 shadow-2xl"
  style="
    background: linear-gradient(135deg, #0d1b2a 0%, #0a1520 60%, #0d1f1a 100%);
    border: 1px solid rgba(255,255,255,0.06);
    border-left: 3px solid {colors[i]};
    box-shadow: inset 2px 0 24px -8px {colors[i]}22;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  "
  bind:this={itemEls[i]}
  onmouseenter={(e) => e.currentTarget.style.transform = 'translateY(-3px) translateX(2px)'}
  onmouseleave={(e) => e.currentTarget.style.transform = ''}
>
  <!-- Radial glow overlay -->
  <div
    class="pointer-events-none absolute inset-0"
    style="background: radial-gradient(ellipse at 0% 50%, {colors[i]}12 0%, transparent 60%)"
  ></div>

  <!-- Watermark number -->
  <span
    class="pointer-events-none absolute right-6 top-4 font-heading text-6xl font-bold leading-none select-none"
    style="color: {colors[i]}; opacity: 0.07"
  >0{i + 1}</span>

  <!-- Title -->
  <h3 class="relative font-heading text-2xl text-white">{item.title}</h3>

  <!-- Gradient rule -->
  <div
    class="relative h-px border-0"
    style="background: linear-gradient(to right, {colors[i]}66, transparent)"
  ></div>

  <!-- Body -->
  <p class="relative text-md leading-relaxed " style="color: rgba(210,225,220,0.72)">{item.body}</p>
</li>
		{/each}

		<li class="col-start-2 row-span-full flex items-center justify-center">
			<div bind:this={targetTextEl} class="px-8 py-32">
				<div class="grid items-start justify-center gap-8">
					<div class="group relative">
						<div
							class="animate-tilt absolute -inset-0.5 rounded-lg bg-linear-to-r from-green-600 to-cyan-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
						></div>
						<button
							class="relative flex items-center divide-x divide-gray-600 rounded-lg bg-slate-950 px-7 py-4 leading-none"
						>
							<h3 class="text-center font-heading text-2xl">Economic Brilliance</h3>
						</button>
					</div>
				</div>
			</div>
		</li>
	</ul>
</section>