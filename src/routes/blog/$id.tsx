import { getBlogPostById } from '@/hooks/blog-hook';
import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'


export const Route = createFileRoute('/blog/$id')({
  component: RouteComponent,
})

function RouteComponent() {


    const { id } = useParams( { from: '/blog/$id'} );

    const { data, isLoading, isError } = getBlogPostById(id);

    if (isLoading) return <p>Loading....</p>
    if (isError) return <p>Error loading the blog post</p>

  return (
      <div className="bg-[#FFF8F1] min-h-screen px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="text-[#581845] hover:underline text-sm font-medium mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
  
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#581845] leading-tight">
            {data?.title}
          </h1>
  
          {/* Author Info */}
          <div className="mt-4 text-sm text-[#757575]">
            <span>{data?.author}</span> · <span>{data?.date}</span>
          </div>
  
          {/* Hero Image */}
          <div className="my-8 rounded-lg overflow-hidden shadow-md">
            <img
              src={data?.imageUrl}
              alt="Stretching therapy"
              className="w-full h-72 object-cover"
            />
          </div>
  
          {/* Content */}
          <div className="prose prose-lg max-w-none text-[#424242]">
            <p>{data?.description}</p>
            <p className="mt-8 font-semibold">
              Always consult with a licensed physical therapist before beginning any new routine—especially if you have persistent or severe pain.
            </p>
          </div>
        </div>
      </div>
    )
}
