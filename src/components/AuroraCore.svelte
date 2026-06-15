<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, createTimeline, type Animatable } from 'animejs';

	// ─── Data ────────────────────────────────────────────────────────────────────

	const items = [
		{
			title: 'Solar Winds',
			body: 'Just as solar winds power the northern lights, labor market forces drive economic opportunity. Changes in hiring demand, industry growth, technological advancement, and workforce availability create the conditions that shape careers and businesses alike.'
		},
		{
			title: 'Magnetic Field',
			body: 'Opportunity emerges when education, training, employers, and workers move in the same direction. Structural alignment ensures workforce investments connect to real-world outcomes, creating pathways that benefit both employers and the people they hire.'
		},
		{
			title: 'Atmosphere',
			body: 'Behind every workforce statistic is a person seeking growth, purpose, and economic mobility. Human potential is the atmosphere through which opportunity becomes visible — the strongest workforce systems recognize that success is built by people, not numbers.'
		}
	] as const;

	const COLORS = ['#5DCAA5', '#85B7EB', '#AFA9EC'] as const;

	// ─── Refs ─────────────────────────────────────────────────────────────────────

	let sectionEl = $state<HTMLElement | null>(null);
	let svgEl     = $state<SVGSVGElement | null>(null);
	let targetEl  = $state<HTMLElement | null>(null);

	// Arrays initialised with nulls so bind:this works on each index
	let pathEls = $state<(SVGPathElement | null)[]>([null, null, null]);
	let itemEls = $state<(HTMLLIElement | null)[]>([null, null, null]);

	// ─── Animation state ──────────────────────────────────────────────────────────

	let loopInstances: ReturnType<typeof animate>[] = [];
	let isMobile = $state(false);

	// ─── Helpers ──────────────────────────────────────────────────────────────────

	/** Cubic-bezier path from (x1,y1) → (x2,y2) with a natural arc. */
	function buildPath(x1: number, y1: number, x2: number, y2: number): string {
		const dx   = x2 - x1;
		const cp1x = x1 + dx * 0.7;
		const cp1y = y1;
		const cp2x = x2 - dx * 0.15;
		const cp2y = y2;
		return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
	}

	/** Recalculate SVG path coordinates from DOM positions. */
	function updatePaths(): void {
		if (!svgEl || !targetEl) return;

		const svgRect    = svgEl.getBoundingClientRect();
		const targetRect = targetEl.getBoundingClientRect();
		const tx = targetRect.left - svgRect.left + targetRect.width  / 2;
		const ty = targetRect.top  - svgRect.top  + targetRect.height / 2;

		itemEls.forEach((el, i) => {
			const path = pathEls[i];
			if (!el || !path) return;

			const itemRect = el.getBoundingClientRect();

			let x1: number, y1: number;

			if (isMobile) {
				// On mobile the cards stack vertically → connect from bottom-center
				x1 = itemRect.left - svgRect.left + itemRect.width / 2;
				y1 = itemRect.bottom - svgRect.top;
			} else {
				// Desktop → connect from right-center of each card
				x1 = itemRect.right - svgRect.left;
				y1 = itemRect.top   - svgRect.top + itemRect.height / 2;
			}

			path.setAttribute('d', buildPath(x1, y1, tx, ty));
		});
	}

	/** Start the infinite dashed-line march on a single path. */
	function startLoop(path: SVGPathElement, index: number): void {
		path.style.strokeDasharray  = '10 6';
		path.style.strokeDashoffset = '0';

		const inst = animate(path as unknown as Animatable, {
			strokeDashoffset: -32,
			duration : 1400 + index * 180,
			ease     : 'linear',
			loop     : true
		});

		loopInstances.push(inst);
	}

	/** Full entrance animation: cards slide in, then paths draw in sequence. */
	function runIntro(): void {
		// Stop any previous loop animations
		loopInstances.forEach(a => a.pause());
		loopInstances = [];

		// Cards fade + slide in
		const cards = itemEls.filter(Boolean) as HTMLLIElement[];
		animate(cards as unknown as Animatable, {
			opacity   : [0, 1],
			translateX: isMobile ? [0, 0] : [-80, 0],
			translateY: isMobile ? [40, 0] : [0, 0],
			duration  : 600,
			ease      : 'outQuad',
			delay     : (_el: Element, i: number) => i * 200
		});

		// Paths draw one after another, then start looping
		const tl = createTimeline({ defaults: { ease: 'inOutQuad' } });

		pathEls.forEach((path, i) => {
			if (!path) return;

			const len = path.getTotalLength();
			path.style.strokeDasharray  = `${len}`;
			path.style.strokeDashoffset = `${len}`;

			tl.add(
				path as unknown as Animatable,
				{
					strokeDashoffset: 0,
					duration : 800,
					delay    : 200 + i * 300,
					onComplete: () => startLoop(path, i)
				},
				i * 160
			);

			// Pulse the card when its path arrives
			const card = itemEls[i];
			if (card) {
				tl.add(
					card as unknown as Animatable,
					{
						scale   : [{ to: 1.04, duration: 280, ease: 'outSine' },
						           { to: 1,    duration: 280, ease: 'inSine'  }],
						delay   : 200 + i * 300
					},
					i * 160
				);
			}
		});
	}

	// ─── Lifecycle ────────────────────────────────────────────────────────────────

	onMount(() => {
		// Detect mobile once
		isMobile = window.innerWidth < 768;

		// Hide cards before intro
		itemEls.forEach(el => {
			if (!el) return;
			el.style.opacity   = '0';
			el.style.transform = isMobile ? 'translateY(40px)' : 'translateX(-80px)';
		});

		updatePaths();

		// Keep paths in sync when layout changes (resize / font load / etc.)
		const ro = new ResizeObserver(() => {
			isMobile = window.innerWidth < 768;
			updatePaths();
		});
		if (sectionEl) ro.observe(sectionEl);

		// Trigger intro once when 40 % of section is visible
		let played = false;
		const io = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && !played) {
				played = true;
				io.disconnect();
				runIntro();
			}
		}, { threshold: 0.25 });
		if (sectionEl) io.observe(sectionEl);

		return () => {
			loopInstances.forEach(a => a.pause());
			ro.disconnect();
			io.disconnect();
		};
	});
</script>

<!-- ─── Markup ──────────────────────────────────────────────────────────────── -->

<section bind:this={sectionEl} class="aurora-section">
	<h2 class="aurora-heading">What Makes the Aurora?</h2>

	<!-- SVG canvas for animated connecting paths -->
	<svg
		bind:this={svgEl}
		class="aurora-svg"
		aria-hidden="true"
	>
		<defs>
			{#each COLORS as color, i (color)}
				<marker
					id="arrow-{i}"
					viewBox="0 0 10 10"
					refX="8" refY="5"
					markerWidth="6" markerHeight="6"
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

		{#each COLORS as color, i (color)}
			<path
				bind:this={pathEls[i]}
				d=""
				fill="none"
				stroke={color}
				stroke-width="2"
				stroke-linecap="round"
				opacity="0.85"
				marker-end="url(#arrow-{i})"
			/>
		{/each}
	</svg>

	<!-- Layout: cards on left / top, target badge on right / bottom -->
	<ul class="aurora-grid">
		{#each items as item, i (item.title)}
			<li
				bind:this={itemEls[i]}
				class="aurora-card"
				style="--accent: {COLORS[i]}"
				onmouseenter={(e) => (e.currentTarget as HTMLLIElement).classList.add('hovered')}
				onmouseleave={(e) => (e.currentTarget as HTMLLIElement).classList.remove('hovered')}
			>
				<!-- Radial ambient glow -->
				<div class="card-glow" aria-hidden="true"></div>

				<!-- Watermark index -->
				<span class="card-watermark" aria-hidden="true">0{i + 1}</span>

				<h3 class="card-title">{item.title}</h3>
				<div class="card-rule" role="presentation"></div>
				<p class="card-body">{item.body}</p>
			</li>
		{/each}

		<!-- Target badge -->
		<li class="aurora-target-cell">
			<div bind:this={targetEl} class="aurora-badge-wrapper">
				<div class="aurora-badge-glow" aria-hidden="true"></div>
				<div class="aurora-badge">
					<h3 class="aurora-badge-label">Economic Brilliance</h3>
				</div>
			</div>
		</li>
	</ul>
</section>

<!-- ─── Styles ─────────────────────────────────────────────────────────────── -->

<style>
	/* ── Section ── */
	.aurora-section {
		position: relative;
		padding: 3rem 6rem;
	}

	.aurora-heading {
		font-family: var(--font-heading, serif);
		font-size:   1.875rem;
		margin-bottom: 2rem;
	}

	/* ── SVG overlay ── */
	.aurora-svg {
		pointer-events: none;
		position: absolute;
		inset: 0;
		width:  100%;
		height: 100%;
		overflow: visible;
	}

	/* ── Grid ── */
	.aurora-grid {
		display: grid;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 2rem;

		/* Desktop: 3 card rows on left column, badge spans right column */
		grid-template-columns: 1fr 1fr;
		grid-template-rows: repeat(3, auto);
		align-items: center;
	}

	/* ── Cards ── */
	.aurora-card {
		position: relative;
		overflow: hidden;
		border-radius: 0.75rem;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		background: linear-gradient(135deg, #0d1b2a 0%, #0a1520 60%, #0d1f1a 100%);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-left: 3px solid var(--accent);
		box-shadow:
			0 20px 40px -12px rgba(0, 0, 0, 0.5),
			inset 2px 0 24px -8px color-mix(in srgb, var(--accent) 13%, transparent);

		transition: transform 0.25s ease, box-shadow 0.25s ease;
		will-change: transform;
	}

	/* Ambient glow */
	.card-glow {
		pointer-events: none;
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at 0% 50%, color-mix(in srgb, var(--accent) 7%, transparent) 0%, transparent 60%);
	}

	/* Watermark number */
	.card-watermark {
		pointer-events: none;
		user-select: none;
		position: absolute;
		right: 1.5rem;
		top:   1rem;
		font-family: var(--font-heading, serif);
		font-size: 3.75rem;
		font-weight: 700;
		line-height: 1;
		color: var(--accent);
		opacity: 0.07;
	}

	.card-title {
		position: relative;
		font-family: var(--font-heading, serif);
		font-size: 1.5rem;
		color: white;
	}

	.card-rule {
		position: relative;
		height: 1px;
		border: none;
		background: linear-gradient(to right, color-mix(in srgb, var(--accent) 40%, transparent), transparent);
	}

	.card-body {
		position: relative;
		font-size: 0.9375rem;
		line-height: 1.7;
		color: rgba(210, 225, 220, 0.72);
	}

	/* ── Target badge ── */
	.aurora-target-cell {
		grid-column: 2;
		grid-row: 1 / -1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.aurora-badge-wrapper {
		position: relative;
		display: inline-flex;
	}

	.aurora-badge-glow {
		position: absolute;
		inset: -2px;
		border-radius: 0.5rem;
		background: linear-gradient(to right, #16a34a, #0891b2);
		opacity: 0.75;
		filter: blur(8px);
		transition: opacity 0.2s ease;
		animation: tilt 3s ease-in-out infinite alternate;
	}

	.aurora-badge-wrapper:hover .aurora-badge-glow {
		opacity: 1;
	}

	.aurora-badge {
		position: relative;
		background: #020817;
		border-radius: 0.5rem;
		padding: 1rem 1.75rem;
	}

	.aurora-badge-label {
		font-family: var(--font-heading, serif);
		font-size: 1.5rem;
		text-align: center;
		white-space: nowrap;
		color: white;
	}

	@keyframes tilt {
		0%   { transform: rotate(-1deg) scale(1);    }
		100% { transform: rotate( 1deg) scale(1.03); }
	}

	/* ─────────────────────────────────────────────
	   Mobile: single column, badge at bottom
	───────────────────────────────────────────── */
	@media (max-width: 767px) {
		.aurora-section {
			padding: 2rem 1.25rem;
		}

		.aurora-grid {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}

		.aurora-target-cell {
			grid-column: 1;
			grid-row: auto;
			padding: 1rem 0 0;
		}

		.aurora-badge-label {
			font-size: 1.25rem;
		}

		/* Paths need extra vertical space on mobile */
		.aurora-svg {
			/* extend slightly beyond section bounds so arcs don't clip */
			overflow: visible;
		}
	}

	/* ─────────────────────────────────────────────
	   Tablet
	───────────────────────────────────────────── */
	@media (min-width: 768px) and (max-width: 1023px) {
		.aurora-section {
			padding: 2.5rem 3rem;
		}
	}
</style>