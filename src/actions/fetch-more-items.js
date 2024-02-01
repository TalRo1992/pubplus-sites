'use server'
export default async function fetchMoreItems(page, ) {
    if (!domain) return undefined;
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/sites?filters[domain][$eq]=${domain}&fields[0]=domain&populate[0]=categories&populate[1]=logo&populate[2]=colors`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data?.data[0];
}