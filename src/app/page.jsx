import ArticlesAboveTheFold from '@/components/home/ArticlesAboveTheFold'
import TwoColFeed from '@/components/home/TwoColFeed'

export const metadata = {
  description:
    'Banter is a modern, stylish Tailwind CSS template for any blog, magazine, or news site.',
}

export default function HomePage() {
  return (
    <>
      <ArticlesAboveTheFold />
      <section className="relative mx-auto max-w-screen-xl py-12 md:py-16 lg:px-8 lg:py-20 lg:max-w-screen-2xl">
        <div className="w-full lg:grid lg:grid-cols-3 lg:gap-8">
          <TwoColFeed/>
        </div>
      </section>

    </>
  )
}
