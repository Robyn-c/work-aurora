<script lang="ts">
	// ─── Data ────────────────────────────────────────────────────────────────────
	const nav = [
		{
			label: 'Platform',
			links: [
				{ text: 'Labor market signals', href: '#' },
				{ text: 'Workforce analytics',  href: '#' },
				{ text: 'New: Economic Brilliance', href: '#', accent: true }
			]
		},
		{
			label: 'Resources',
			links: [
				{ text: 'Documentation',   href: '#' },
				{ text: 'Research reports', href: '#' },
			]
		},
		{
			label: 'Company',
			links: [
				{ text: 'About',    href: '#' },
				{ text: 'Partners', href: '#' },
				{ text: 'Contact',  href: '#' },
			]
		}
	] as const;


	const legal = [
		{ text: 'Privacy policy',  href: '#' },
		{ text: 'Terms of service', href: '#' },
		{ text: 'Cookie settings',  href: '#' },
	] as const;

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer-top">
		<!-- Brand column -->
		<div class="footer-brand">
			<p class="footer-logo">
				<span class="logo-dot" aria-hidden="true"></span>
				Workplace Aurora
			</p>

			<p class="footer-desc">
				Understanding labor market signals to anticipate change, create opportunity,
				and build stronger workforce systems.
			</p>
		</div>

		<!-- Nav columns -->
		{#each nav as col (col.label)}
			<nav aria-label={col.label}>
				<p class="col-label">{col.label}</p>
				<ul class="col-links">
					{#each col.links as link (link.text)}
						<li>
							<a
								href={link.href}
								class:accent={'accent' in link && link.accent}
							>
								{link.text}{#if 'accent' in link && link.accent}&nbsp;↗{/if}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/each}
	</div>

	<!-- Bottom bar -->
	<div class="footer-bottom">
		<p class="footer-copy">© {year} Workplace Aurora. All rights reserved.</p>

		<ul class="footer-legal" aria-label="Legal links">
			{#each legal as item (item.text)}
				<li><a href={item.href}>{item.text}</a></li>
			{/each}
		</ul>
	</div>
</footer>

<style>
	/* ── Layout ── */
	.footer {
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		padding: 3rem 6rem 2rem;
	}

	.footer-top {
		display: grid;
		grid-template-columns: 1.4fr repeat(3, 1fr);
		gap: 2rem;
		margin-bottom: 2.5rem;
	}

	/* ── Brand ── */
	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.footer-logo {
		font-family: var(--font-heading, serif);
		font-size: 1.0625rem;
		font-weight: 500;
		color: white;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0 0.75rem;
	}

	.logo-dot {
		width:  8px;
		height: 8px;
		border-radius: 50%;
		background: #5DCAA5;
		flex-shrink: 0;
		box-shadow: 0 0 8px #5DCAA560;
	}

	.footer-desc {
		font-size: 0.8125rem;
		line-height: 1.65;
		color: rgba(210, 225, 220, 0.55);
		max-width: 220px;
		margin: 0 0 1rem;
	}

	/* ── Social buttons ── */
	.social-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.social-btn {
		width:  32px;
		height: 32px;
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		background: transparent;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(210, 225, 220, 0.5);
		text-decoration: none;
		font-size: 1rem;
		transition: background 0.15s ease, color 0.15s ease;
	}

	/* ── Nav columns ── */
	.col-label {
		font-size: 0.6875rem;
		font-weight: 500;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: rgba(210, 225, 220, 0.35);
		margin: 0 0 0.875rem;
	}

	.col-links {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.col-links a {
		font-size: 0.84375rem;
		color: rgba(210, 225, 220, 0.55);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.col-links a:hover {
		color: rgba(210, 225, 220, 0.9);
	}

	.col-links a.accent {
		color: #5DCAA5;
	}

	/* ── Bottom bar ── */
	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		padding-top: 1.25rem;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.footer-copy {
		font-size: 0.75rem;
		color: rgba(210, 225, 220, 0.3);
		margin: 0;
	}

	.footer-legal {
		display: flex;
		gap: 1.25rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer-legal a {
		font-size: 0.75rem;
		color: rgba(210, 225, 220, 0.3);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.footer-legal a:hover {
		color: rgba(210, 225, 220, 0.6);
	}

	/* ─────────────────────────────────────────────
	   Tablet
	───────────────────────────────────────────── */
	@media (max-width: 1023px) {
		.footer {
			padding: 2.5rem 3rem 2rem;
		}

		.footer-top {
			grid-template-columns: 1fr 1fr;
		}

		.footer-brand {
			grid-column: 1 / -1;
		}

		.footer-desc {
			max-width: 100%;
		}
	}

	/* ─────────────────────────────────────────────
	   Mobile
	───────────────────────────────────────────── */
	@media (max-width: 767px) {
		.footer {
			padding: 2rem 1.25rem 1.5rem;
		}

		.footer-top {
			grid-template-columns: 1fr 1fr;
			gap: 1.5rem;
		}

		.footer-brand {
			grid-column: 1 / -1;
		}

		.footer-bottom {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.75rem;
		}

		.footer-legal {
			flex-wrap: wrap;
			gap: 0.75rem 1.25rem;
		}
	}
</style>