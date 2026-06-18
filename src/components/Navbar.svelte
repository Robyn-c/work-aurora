<script lang="ts">
  import { page } from '$app/state'; 
	import { resolve } from '$app/paths';
	import { slide } from 'svelte/transition';
  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function closeMenu() {
    menuOpen = false;
  }

	const branches = [
		{ label: 'Architects', href: '/architects' },
		{ label: 'Affiliates', href: '/affiliates' },
		{ label: 'Programs', href: '/programs' },
		{ label: 'Productions', href: '/productions' }
	] as const;
</script>

<header class="relative">
<nav
  class="hidden fixed w-full md:flex gap-x-4 items-center justify-between py-4 px-8 xl:px-24 bg-transparent backdrop-blur-lg z-10"
>
  <a href={resolve('/')} class="text-xl font-heading whitespace-nowrap">
    Workplace Aurora: Intermediary Magic
  </a>
  <ul class="flex items-center gap-4 xl:gap-8 list-none m-0 p-0">
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

<!-- Mobile navbar -->
<nav class="md:hidden fixed w-full z-10 bg-transparent backdrop-blur-lg">
  <div class="flex items-center justify-between py-4 px-6">
    <a href={resolve('/')} class="text-base font-heading whitespace-nowrap">
      Workplace Aurora
    </a>

    <!-- Hamburger button -->
    <button
      onclick={toggleMenu}
      aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={menuOpen}
      class="flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
    >
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
        class:rotate-45={menuOpen}
        class:translate-y-2={menuOpen}
      ></span>
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300"
        class:opacity-0={menuOpen}
        class:scale-x-0={menuOpen}
      ></span>
      <span
        class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
        class:-rotate-45={menuOpen}
        class:-translate-y-2={menuOpen}
      ></span>
    </button>
  </div>

  <!-- Dropdown menu -->
  {#if menuOpen}
    <ul transition:slide={{ duration: 200 }} 
      class="flex flex-col list-none m-0 px-6 py-6 gap-4 border-t border-white/10"
    >
      {#each branches as branch (branch.href)}
        <li>
          <a
            href={resolve(branch.href)}
            onclick={closeMenu}
            class:underline={page.url.pathname === branch.href}
            class:underline-offset-4={page.url.pathname === branch.href}
            class="block text-sm font-medium tracking-wide transition-opacity duration-200 opacity-60 hover:opacity-100 py-1"
            class:opacity-100={page.url.pathname === branch.href}
          >
            {branch.label}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</nav>
</header>