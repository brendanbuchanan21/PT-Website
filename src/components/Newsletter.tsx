export default function NewsletterSignup() {
  return (
    <section className="bg-[#FFF8F1] py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#581845] mb-4">
          Stay Informed
        </h2>
        <p className="text-[#424242] text-lg mb-8">
          Get health tips, news, and updates straight to your inbox.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 rounded-md border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#581845] text-[#424242]"
          />
          <button
            type="submit"
            className="bg-[#581845] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#702759] transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
