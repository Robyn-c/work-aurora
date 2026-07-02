import type { PageServerLoad } from "./$types";
import { ADZUNA_APP_ID, ADZUNA_APP_KEY } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch }) => {
  
  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&where=Pittsburgh&results_per_page=100`
  

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Adzuna returned ${res.status}`)
    }
    const data = await res.json();
    const byCategory = new Map<string, { count: number, sample: string; salaries: number[]}>();

    for (const job of data.results ?? []) {
      const label = job.category?.label ?? "Other";
      const entry = byCategory.get(label) ?? { count: 0, sample: job.title, salaries: [] };
      entry.count += 1;
      if (job.salary_min) entry.salaries.push(job.salary_min);
        byCategory.set(label, entry);
    }

    const jobs = [...byCategory.entries()]
    .map(([title, v]) => ({
      title,
      openings: v.count,
      sample: v.sample,
      avgSalary: v.salaries.length ? Math.round(v.salaries.reduce((a, b) => a + b, 0) / v.salaries.length) : null
    }))
    .sort((a, b) => b.openings - a.openings)
    .slice(0, 8);
    
    return { jobs };


  } catch (err) {
    console.error('Adzuna fetch failed', err);
    return { jobs: []}
  }
}