// import SimpleHeader from '@/components/headers/SimpleHeader'
import SidebarArticles from '@/components/sidebar/SidebarArticles'
import SidebarSocialLinks from '@/components/sidebar/SidebarSocialLinks'
import SidebarInstagramFeed from '@/components/sidebar/SidebarInstagramFeed'
import Newsletter from '@/components/shared/Newsletter'
import { MdxContent } from '@/components/mdx/MdxContent'

export default function Page({ params }) {

  return (
    <>
      {/* <SimpleHeader headline={''} text={''} /> */}

      {/* Main Content */}
      <section className="mx-auto max-w-screen-xl py-12 md:py-16 lg:px-8 lg:py-20">
        <div className="w-full lg:flex lg:space-x-8">
          {/* Page Content */}
          <div className="lg:w-2/3">
            {/* Uses the official Tailwind CSS Typography plugin */}
            <div className="prose mx-auto px-5 sm:prose-lg first-letter:text-4xl first-letter:font-bold first-letter:tracking-[.15em] prose-a:transition prose-a:duration-300 prose-a:ease-in-out hover:prose-a:text-red-700 prose-img:rounded-xl sm:px-6 md:px-8 lg:mx-0 lg:px-0">
              <MdxContent code={1} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="mx-auto mt-12 w-full max-w-xl space-y-8 px-4 sm:mt-16 sm:px-6 md:max-w-2xl md:px-8 lg:mt-0 lg:w-1/3 lg:max-w-none lg:px-0">
            <SidebarArticles
              articles={[]}
              heading="Most read articles"
            />
            <SidebarSocialLinks />
            <SidebarInstagramFeed />
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}

export const dynamicParams = false
