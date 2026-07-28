<script>
  import AuroraCore from "../components/AuroraCore.svelte";
  import HeroSection from "../components/HeroSection.svelte";
	import OurStorySection from "../components/OurStorySection.svelte";
	import WorkedWithUsSection from "../components/WorkedWithUsSection.svelte";

  import garbage2 from "$lib/assets/garbage2.png"
  import garbage3 from "$lib/assets/garbage3.png"
</script>

<main>
  <HeroSection/>
  <AuroraCore/>
  <WorkedWithUsSection/>
  <OurStorySection/>
<div class="flex flex-col md:flex-row w-full">
  <img
    src={garbage2}
    alt="idc"
    class="flex-1 min-w-0 w-full h-auto object-cover"
  />

  <img
    src={garbage3}
    alt="idc"
    class="flex-1 min-w-0 w-full h-auto object-cover"
  />
</div>
</main>

