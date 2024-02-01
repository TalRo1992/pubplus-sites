import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { notFound } from "next/navigation";
import { LoadMore } from "@/components/ui/load-more";


export default function Article({ article, initialItemPosition }) {

  const domain = window.location.host
  const available_site = article?.sites?.data.some((site) => site.attributes.domain === domain);
  if(!available_site){
    return notFound();
  }
  const primarySite = article?.primary_site?.data?.attributes?.domain;
  const isPrimarySite = primarySite === domain;
  const author = article?.Author?.data?.attributes?.pseudonym;

  return (
    <article className="bg-gray-50 pb-12 sm:pb-16 lg:pb-24">
      <header>
        <div className="px-5 lg:px-0">
          <div className="mx-auto mb-8 max-w-7xl border-b border-gray-300/70 pb-8 pt-10 text-lg sm:pt-16">
            <Link
              href={`/categories/${article?.category?.data.attributes.slug}`}
              className="relative text-sm font-medium uppercase tracking-widest text-red-700 transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              {article?.category?.data?.attributes?.category}
            </Link>
            <h1 className="font-serif text-xl leading-tight font-semibold mt-3.5 text-4xl font-medium tracking-normal text-gray-900 decoration-red-300 decoration-3 transition duration-300 ease-in-out group-hover:underline sm:mt-5 sm:text-5xl sm:leading-tight md:tracking-tight lg:text-6xl">
              {article?.Title}
            </h1>
            {author && <p className='text-gray-500 text-base mb-8 opacity-70'>By {author} - {format(parseISO(article?.publishedAt), 'LLL d, yyyy')}</p>}
            {!isPrimarySite && (<p className='text-gray-600 text-xs opacity-50 mb-8'>This article appeared in <a href={primarySite} target='_blank'>{primarySite}</a> and has been published here with permission.</p>)}
            <div>
              {
                article?.Item.length > 0 && article.Item.map((item,index) => {
                  const imageFormats = item?.image?.data?.attributes?.formats;
                  return (
                    <section className='mb-8' key={item.title}
                     id={`${article.slug}/item_${initialItemPosition + index}`}>  
                      <h2 className='text-2xl font-semibold leading-9'>{item.title}</h2>
                      <div className="mt-4 text-base leading-loose text-gray-600">
                        <p>{item.pre_image_text}</p>
                        {imageFormats && 
                        <img className="w-full" 
                          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${imageFormats?.medium?.url || imageFormats?.large?.url}`}
                          alt="item Image" />}
                        <Link className='cursor-text text-gray-600 text-xs mb-8 opacity-70' href={item?.caption_url || '/'} target='_blank'>{item.caption_description}</Link>
                        <br></br>
                        <p className='text-lg font-normal leading-9 text-gray-700'>
                        {item.post_image_text}
                        </p>
                      </div>
                      <LoadMore />
                    </section>
                  )
                })}
            </div>
          </div>
        </div>
      </header>
    </article>
  )
}
