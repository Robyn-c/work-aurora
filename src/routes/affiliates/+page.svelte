<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
	import { resolve } from '$app/paths';

	import careerWiredImg from '$lib/assets/career-convergence.png';
	import freedLanceImg from '$lib/assets/freedlance-fencing.png';
  import wdpnImg from '$lib/assets/wdpn.png'
  import cwdpImg from '$lib/assets/cwdp.png'

	const stats = [
		{ number: '80+', label: 'Partner Organizations' },
		{ number: '300+', label: 'Professional Graduates' },
		{ number: '15+', label: 'Regional Networks' },
		{ number: '25+', label: 'Awarded Visionaries' }
	];

	const networks = [
		{
			name: 'CareerWired',
			body: 'Advancing workforce innovation through technology-enabled career pathways, employer engagement, and talent development strategies that connect people to meaningful work.',
			accent: '#5DCAA5',
			logo: careerWiredImg
		},
		{
			name: 'WDPN',
			body: 'The Workforce Development Professionals Network strengthens practitioners, educators, and workforce leaders through professional development, collaboration, and shared best practices.',
			accent: '#85B7EB',
			logo: wdpnImg // e.g. '/images/wdpn-logo.svg'
		},
		{
			name: 'Freelance Fencing',
			body: 'Supporting entrepreneurship, skilled trades, and independent contracting pathways through practical experience, craftsmanship, and community engagement.',
			accent: '#AFA9EC',
			logo: freedLanceImg // e.g. '/images/freelance-fencing-logo.svg'
		},
		{
			name: 'CWDP Regional Network',
			body: 'A growing network of workforce professionals, employers, educators, and community leaders committed to strengthening regional workforce ecosystems.',
			accent: '#5DCAA5',
			logo: cwdpImg
		}
	];
	const communities = [
		{
			name: 'CW & WFD Pro Graduates',
			body: 'Graduates who have completed professional workforce development and career coaching pathways and continue to contribute to the field through leadership and service.',
			accent: '#5DCAA5'
		},
		{
			name: 'Pardon Coaches',
			body: 'Dedicated professionals helping individuals overcome barriers to employment, navigate career transitions, and build sustainable pathways toward economic mobility.',
			accent: '#85B7EB'
		},
		{
			name: 'Master Trainers & Subject Matter Experts',
			body: 'Experienced practitioners who share knowledge, mentor emerging professionals, and support excellence across workforce and human service disciplines.',
			accent: '#AFA9EC'
		}
	];

	const visionaries = [
		{
			name: 'SPARC Awarded Visionaries',
			body: 'Recognized leaders whose innovation, commitment, and impact continue to inspire communities, organizations, and future generations of workforce professionals.',
			accent: '#5DCAA5'
		}
	];

	const programs = [
		{
			name: 'Centers of Excellence Pathways',
			body: 'Programs designed to support lifelong learning, workforce readiness, leadership development, and career advancement across multiple industries and sectors.',
			accent: '#5DCAA5'
		}
	];

	function onVisible(selector: string, cb: () => void, threshold = 0.15) {
		const el = document.querySelector(selector);
		if (!el) return;
		const io = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					cb();
					io.disconnect();
				}
			},
			{ threshold }
		);
		io.observe(el);
	}

	onMount(() => {
		animate('.hero-title', {
			opacity: [0, 1],
			translateY: ['60%', '0%'],
			duration: 900,
			ease: 'outExpo'
		});
		animate('.hero-sub', {
			opacity: [0, 1],
			translateY: [20, 0],
			duration: 700,
			delay: 400,
			ease: 'outQuad'
		});
		animate('.hero-body', {
			opacity: [0, 1],
			translateY: [16, 0],
			duration: 700,
			delay: 600,
			ease: 'outQuad'
		});

		onVisible('.stats-section', () => {
			animate('.stat-item', {
				opacity: [0, 1],
				translateY: [32, 0],
				duration: 600,
				delay: stagger(120),
				ease: 'outQuad'
			});
		});

		[
			'.networks-section',
			'.communities-section',
			'.visionaries-section',
			'.programs-section'
		].forEach((sel) => {
			onVisible(sel, () => {
				animate(`${sel} .section-eyebrow`, {
					opacity: [0, 1],
					translateX: [-16, 0],
					duration: 500,
					ease: 'outQuad'
				});
				animate(`${sel} .affiliate-card`, {
					opacity: [0, 1],
					translateY: [40, 0],
					duration: 600,
					delay: stagger(140),
					ease: 'outQuad'
				});
			});
		});

		onVisible('.cta-section', () => {
			animate('.cta-inner', {
				opacity: [0, 1],
				translateY: [24, 0],
				duration: 700,
				ease: 'outQuad'
			});
		});
	});
</script>

<!-- Hero -->
<section
	class="relative flex min-h-screen flex-col justify-center overflow-hidden px-8 pt-32 pb-24 md:px-24"
>
	<!-- Grid texture -->
	<div
		class="pointer-events-none absolute inset-0 overflow-hidden"
		aria-hidden="true"
		style="
    background-image:
      linear-gradient(rgba(93,202,165,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(93,202,165,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 20% 40%, black 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 20% 40%, black 30%, transparent 80%);
  "
	></div>
	<!-- Accent glows -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="absolute -top-32 -left-32 h-150 w-150 rounded-full"
			style="background: radial-gradient(circle, rgba(93,202,165,0.10), transparent 65%)"
		></div>
		<div
			class="absolute top-1/2 right-0 h-96 w-96 rounded-full"
			style="background: radial-gradient(circle, rgba(133,183,235,0.08), transparent 65%)"
		></div>
	</div>

	<!-- Eyebrow label -->
	<div class="hero-sub mb-8 flex items-center gap-4 opacity-0">
		<div class="h-px w-12" style="background: #5DCAA5"></div>
		<p class="font-heading text-xs tracking-[0.3em] uppercase" style="color: #5DCAA5">
			In Pursuit of Excellence
		</p>
	</div>

	<div class="mb-8 overflow-hidden">
		<h1
			class="hero-title font-heading leading-none font-bold text-white opacity-0"
			style="font-size: clamp(4rem, 14vw, 11rem); letter-spacing: -0.03em"
		>
			AFFILIATES
		</h1>
	</div>

	<p
		class="hero-body max-w-xl text-base leading-relaxed opacity-0 md:text-lg"
		style="color: rgba(210,225,220,0.6); border-left: 2px solid rgba(93,202,165,0.3); padding-left: 1.25rem;"
	>
		Bringing together workforce professionals, educators, community leaders, graduates, coaches, and
		visionaries committed to creating pathways of opportunity.
	</p>

	<div
		class="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-30"
	>
		<span class="text-xs tracking-widest uppercase">Scroll</span>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M3 6L8 11L13 6"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</section>

<!-- Stats -->
<section
	class="stats-section px-8 py-20 md:px-24"
	style="background: linear-gradient(to right, rgba(93,202,165,0.04), transparent 60%); border-top: 1px solid rgba(93,202,165,0.15); border-bottom: 1px solid rgba(255,255,255,0.06);"
>
	<div class="grid grid-cols-2 gap-0 md:grid-cols-4">
		{#each stats as s, i (s.label)}
			<div
				class="stat-item flex flex-col gap-3 px-8 py-6 opacity-0 first:pl-0"
				style={i > 0 ? 'border-left: 1px solid rgba(255,255,255,0.07)' : ''}
			>
				<span
					class="font-heading leading-none font-bold"
					style="font-size: clamp(2.5rem, 6vw, 4rem); color: #5DCAA5; letter-spacing: -0.02em"
					>{s.number}</span
				>
				<span class="text-xs tracking-[0.18em] uppercase" style="color: rgba(210,225,220,0.45)"
					>{s.label}</span
				>
			</div>
		{/each}
	</div>
</section>

<!-- Networks & Partners -->
<section class="networks-section px-8 py-32 md:px-24">
	<div class="mb-24 flex items-center gap-6">
		<p
			class="section-eyebrow font-heading text-xs tracking-[0.3em] uppercase"
			style="color:#5DCAA5"
		>
			Networks & Partners
		</p>

		<div
			class="h-px flex-1"
			style="
				background:
				linear-gradient(
					to right,
					rgba(93,202,165,.4),
					transparent
				);
			"
		></div>
	</div>

	<div class="grid gap-6 md:grid-cols-3">
		{#each networks as item, i (item.name)}
			<article
				class="
					affiliate-card
					group
					relative
					overflow-hidden
					rounded-4xl
					opacity-0
					transition-all
					duration-500
				"
				style="
					{i === 0 ? 'grid-column: span 2;' : ''}

					background:
					linear-gradient(
						145deg,
						#0d1823 0%,
						#0b1118 100%
					);

					border:
					1px solid rgba(255,255,255,.05);
				"
			>
				<!-- glow -->
				<div
					class="
						absolute
						inset-0
						opacity-0
						transition-opacity
						duration-500
						group-hover:opacity-100
					"
					style="
						background:
						radial-gradient(
							circle at top left,
							color-mix(in srgb, {item.accent} 18%, transparent),
							transparent 55%
						);
					"
				></div>

				<div
					class="
						relative
						flex
						h-full
						flex-col
						justify-between
						p-8
						lg:p-10
						xl:p-14
					"
				>
					<!-- LOGO HERO -->
					<div class="mb-12">
						{#if item.logo}
							<img
								src={item.logo}
								alt="{item.name} logo"
								class="
									w-auto
									object-contain
									transition-transform
									duration-500
									group-hover:scale-[1.03]
								"
							/>
						{:else}
							<div
								class="
									font-heading
									text-4xl
									font-light
								"
								style="color:{item.accent}"
							>
								{item.name}
							</div>
						{/if}
					</div>

					<!-- CONTENT -->
					<div class="max-w-xl">
						<p
							class="
								mb-4
								text-xs
								tracking-[0.25em]
								uppercase
							"
							style="color:{item.accent}"
						>
							Partner Network
						</p>

						<h3
							class="
								mb-6
								font-heading
								leading-none
								text-white
							"
							style="
								font-size:
								{i === 0 ? 'clamp(2rem,3vw,3rem)' : 'clamp(1.25rem,2vw,1.75rem)'};
							"
						>
							{item.name}
						</h3>

						<p
							class="
								max-w-prose
								leading-relaxed
							"
							style="
								color:rgba(220,230,225,.7);
								font-size:
								{i === 0 ? '1rem' : '.9rem'};
							"
						>
							{item.body}
						</p>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
<!-- Professional Communities -->
<section
	class="communities-section border-t px-8 py-24 md:px-24"
	style="border-color: rgba(255,255,255,0.04)"
>
	<div class="mb-14 flex items-center gap-6">
		<p
			class="section-eyebrow font-heading text-xs tracking-[0.28em] whitespace-nowrap uppercase opacity-0"
			style="color: #85B7EB"
		>
			Professional Communities
		</p>
		<div
			class="h-px flex-1"
			style="background: linear-gradient(to right, rgba(133,183,235,0.35), transparent)"
		></div>
	</div>
	<div class="grid grid-cols-1 gap-5 md:grid-cols-3">
		{#each communities as item (item.name)}
			<article
				class="affiliate-card relative flex flex-col gap-5 overflow-hidden rounded-2xl p-8 opacity-0 transition-all duration-300"
				style="background: linear-gradient(145deg, #0d1b2e 0%, #0b1625 60%, #0e1a28 100%); border: 1px solid rgba(255,255,255,0.07); border-top: 2px solid {item.accent};"
				onmouseenter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.24)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(-2px)';
					el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)';
				}}
				onmouseleave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.12)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(0)';
					el.style.boxShadow = 'none';
				}}
			>
				<div
					class="pointer-events-none absolute inset-0"
					aria-hidden="true"
					style="background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb,{item.accent} 12%,transparent), transparent 60%)"
				></div>
				<div class="relative flex items-start justify-between">
					<h3 class="font-heading text-lg text-white" style="letter-spacing: 0.01em">
						{item.name}
					</h3>
					<div
						class="mt-1 ml-4 h-2 w-2 shrink-0 rounded-full"
						style="background: {item.accent}; opacity: 0.7"
					></div>
				</div>
				<div
					class="relative h-px w-10"
					style="background: linear-gradient(to right, {item.accent}, transparent); opacity: 0.4"
				></div>
				<p class="relative text-sm leading-relaxed" style="color:rgba(210,225,220,0.62)">
					{item.body}
				</p>
			</article>
		{/each}
	</div>
</section>

<!-- Visionaries & Leaders -->
<section
	class="visionaries-section border-t px-8 py-24 md:px-24"
	style="border-color: rgba(255,255,255,0.04)"
>
	<div class="mb-14 flex items-center gap-6">
		<p
			class="section-eyebrow font-heading text-xs tracking-[0.28em] whitespace-nowrap uppercase opacity-0"
			style="color: #AFA9EC"
		>
			Visionaries &amp; Leaders
		</p>
		<div
			class="h-px flex-1"
			style="background: linear-gradient(to right, rgba(175,169,236,0.35), transparent)"
		></div>
	</div>
	<div class="grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
		{#each visionaries as item (item.name)}
			<article
				class="affiliate-card relative flex flex-col gap-5 overflow-hidden rounded-2xl p-10 opacity-0 transition-all duration-300"
				style="background: linear-gradient(145deg, #130f2a 0%, #0f0c20 60%, #120e25 100%); border: 1px solid rgba(175,169,236,0.12); border-top: 2px solid {item.accent};"
				onmouseenter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.24)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(-2px)';
					el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)';
				}}
				onmouseleave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.12)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(0)';
					el.style.boxShadow = 'none';
				}}
			>
				<div
					class="pointer-events-none absolute inset-0"
					aria-hidden="true"
					style="background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb,{item.accent} 14%,transparent), transparent 60%)"
				></div>
				<div class="relative flex items-start justify-between">
					<h3 class="font-heading text-xl text-white" style="letter-spacing: 0.01em">
						{item.name}
					</h3>
					<div
						class="mt-1.5 ml-4 h-2 w-2 shrink-0 rounded-full"
						style="background: {item.accent}; opacity: 0.8"
					></div>
				</div>
				<div
					class="relative h-px w-12"
					style="background: linear-gradient(to right, {item.accent}, transparent); opacity: 0.5"
				></div>
				<p class="relative text-sm leading-relaxed" style="color:rgba(210,225,220,0.65)">
					{item.body}
				</p>
			</article>
		{/each}
	</div>
</section>

<!-- Programs on CoE Pathways -->
<section
	class="programs-section border-t px-8 py-24 md:px-24"
	style="border-color: rgba(255,255,255,0.04)"
>
	<div class="mb-14 flex items-center gap-6">
		<p
			class="section-eyebrow font-heading text-xs tracking-[0.28em] whitespace-nowrap uppercase opacity-0"
			style="color: #5DCAA5"
		>
			Affiliate Programs on CoE Pathways
		</p>
		<div
			class="h-px flex-1"
			style="background: linear-gradient(to right, rgba(93,202,165,0.35), transparent)"
		></div>
	</div>
	<div class="grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
		{#each programs as item (item.name)}
			<article
				class="affiliate-card relative flex flex-col gap-5 overflow-hidden rounded-2xl p-10 opacity-0 transition-all duration-300"
				style="background: linear-gradient(145deg, #0d1e17 0%, #0b1913 60%, #0d1f18 100%); border: 1px solid rgba(93,202,165,0.10); border-top: 2px solid {item.accent};"
				onmouseenter={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.24)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(-2px)';
					el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)';
				}}
				onmouseleave={(e) => {
					const el = e.currentTarget as HTMLElement;
					el.style.borderColor = 'rgba(175,169,236,0.12)';
					el.style.borderTopColor = item.accent;
					el.style.transform = 'translateY(0)';
					el.style.boxShadow = 'none';
				}}
			>
				<div
					class="pointer-events-none absolute inset-0"
					aria-hidden="true"
					style="background: radial-gradient(ellipse at 50% 0%, color-mix(in srgb,{item.accent} 14%,transparent), transparent 60%)"
				></div>
				<div class="relative flex items-start justify-between">
					<h3 class="font-heading text-xl text-white" style="letter-spacing: 0.01em">
						{item.name}
					</h3>
					<div
						class="mt-1.5 ml-4 h-2 w-2 shrink-0 rounded-full"
						style="background: {item.accent}; opacity: 0.8"
					></div>
				</div>
				<div
					class="relative h-px w-12"
					style="background: linear-gradient(to right, {item.accent}, transparent); opacity: 0.5"
				></div>
				<p class="relative text-sm leading-relaxed" style="color:rgba(210,225,220,0.65)">
					{item.body}
				</p>
			</article>
		{/each}
	</div>
</section>

<!-- CTA -->
<section
	class="cta-section relative overflow-hidden border-t px-8 py-32 md:px-24"
	style="border-color: rgba(255,255,255,0.06)"
>
	<!-- Decorative large quote mark -->
	<div
		class="pointer-events-none absolute top-12 left-16 select-none"
		aria-hidden="true"
		style="font-size: 20rem; line-height: 1; color: rgba(93,202,165,0.04); font-family: Georgia, serif; font-weight: 700; user-select: none"
	>
		"
	</div>
	<div class="cta-inner relative max-w-2xl opacity-0">
		<p
			class="mb-8 flex items-center gap-3 font-heading text-xs tracking-[0.28em] uppercase"
			style="color: rgba(210,225,220,0.35)"
		>
			<span class="inline-block h-px w-8" style="background: rgba(93,202,165,0.3)"></span>
			Together
		</p>
		<blockquote
			class="mb-10 font-heading leading-snug text-white"
			style="font-size: clamp(1.25rem, 3vw, 1.875rem)"
		>
			A community united by a common purpose: creating opportunity, advancing dignity, and building
			pathways toward a stronger future.
		</blockquote>
		<a
			href={resolve('/programs')}
			class="inline-flex items-center gap-3 rounded-full px-8 py-4 font-heading text-sm tracking-widest uppercase transition-all duration-300 hover:gap-5"
			style="background: rgba(93,202,165,0.1); border: 1px solid rgba(93,202,165,0.4); color: #5DCAA5"
			onmouseenter={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.background = 'rgba(93,202,165,0.1)';
				el.style.borderColor = 'rgba(93,202,165,0.7)';
			}}
			onmouseleave={(e) => {
				const el = e.currentTarget as HTMLElement;
				el.style.background = 'rgba(93,202,165,0.1)';
				el.style.borderColor = 'rgba(93,202,165,0.4)';
			}}
		>
			Explore Programs
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
				<path
					d="M2 7h10M8 3l4 4-4 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>
	</div>
</section>
