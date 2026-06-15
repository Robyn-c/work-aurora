<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const branches = [
		{ label: 'Architects', href: '/architects' },
		{ label: 'Affiliates', href: '/affiliates' },
		{ label: 'Programs', href: '/programs' },
		{ label: 'Productions', href: '/productions' }
	] as const;
</script>

<header class="relative">
	<nav
		class="fixed w-full flex items-center justify-between py-4 px-24 bg-transparent backdrop-blur-lg z-10"
	>
		<a href={resolve('/')} class="text-xl font-heading whitespace-nowrap">
			Workplace Aurora: Intermediary Magic
		</a>

		<ul class="flex items-center gap-8 list-none m-0 p-0">
			{#each branches as branch (branch.href)}
				<li>
					<a
						href={resolve(branch.href)}
						class:text-opacity-100={page.url.pathname === branch.href}
						class:underline={page.url.pathname === branch.href}
						class:underline-offset-4={page.url.pathname === branch.href}
						class="text-sm font-medium tracking-wide transition-opacity duration-200 opacity-60 hover:opacity-100"
					>
						{branch.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>