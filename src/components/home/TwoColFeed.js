import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { getCategoriesData } from "@/api/articles";
import clsx from 'clsx'
import { headers } from "next/headers";

function Article({ article }) {
  const { attributes } = article;
  const articleItem = attributes?.Item[0];
  const articleImage = articleItem?.image?.data?.attributes?.formats?.medium?.url;

  return (
    <article
      className={clsx('py-8 sm:flex-col lg:flex-col xl:flex-col xl:items-center border-t border-gray-300/70 lg:border-t-0 xl:border-t')}
    >
      <Link
        href={`/articles/${attributes?.slug}`}
        className="order-2 w-full sm:w-2/5 lg:order-1 lg:w-full xl:w-5/5"
      >
        <div className="group aspect-h-9 aspect-w-16 overflow-hidden rounded-2xl bg-gray-100">
          <Image
            className="rounded-2xl object-cover object-center transition duration-300 ease-in-out group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${articleImage}`}
            alt={attributes.Title}
            fill
            sizes="(min-width: 1536px) 17.6rem, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 15rem, calc(100vw - 2rem)"
          />
        </div>
      </Link>
      <div className="order-1 mt-5 w-full px-2 sm:mt-0 sm:max-w-sm sm:pl-0 sm:pr-5 lg:order-2 lg:mt-4 xl:ml-5 xl:mt-0 xl:flex-1">

        <Link href={`/categories/${attributes?.category?.data.attributes.slug}`}>
          <h3 className="mt-2 text-xl font-medium leading-normal tracking-normal text-gray-900 decoration-gray-800 decoration-2 transition duration-300 ease-in-out hover:underline">
            {attributes.Title}
          </h3>
        </Link>
        <div className="text-sm text-gray-500">
          <span className="mx-1">
              {format(parseISO(attributes.publishedAt), 'LLL d, yyyy')}
          </span>
        </div>
      </div>
    </article>
  )
}

export default async function TwoColFeed() {
  const headersList = headers();
  const domain = headersList.get('host');
  let categoriesData = await getCategoriesData(domain);

  return (
    <div className="col-span-3">
      <div className="mx-auto max-w-xl px-4 sm:px-6 md:max-w-3xl md:px-8 lg:max-w-none lg:px-0">
        <div className="mt-8 gap-6 md:grid-cols-3">
          {
            categoriesData.map((category, index) => {
              return (
                category.attributes?.articles.data.length > 0 &&
                <>
                  <h2>{category.attributes.category}</h2>
                  <div className='md:grid lg:flex flex-row gap-8 sm:grid' key={category.attributes.slug}>
                      {category.attributes?.articles.data.map((article, index) => (
                        <Article key={`two-col-article-${index}`} article={article} />
                      ))}
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
