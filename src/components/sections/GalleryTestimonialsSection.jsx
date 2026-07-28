import { useHomeData } from '../../context/HomeDataContext'

function GalleryTestimonialsSection() {
  const { gallery } = useHomeData()

  return (
    <section id="gallery" className="hidden bg-white py-16" aria-hidden="true">
      <div className="mx-auto w-full max-w-page px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-nursery-green uppercase">
            Gallery
          </p>
          <h2 className="text-3xl font-extrabold text-nursery-dark">
            Moments of Joy
          </h2>
        </div>

        {gallery.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((item, i) => (
              <div
                key={item.id ?? i}
                className="overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.alt || `Gallery moment ${i + 1}`}
                  width={400}
                  height={280}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  decoding="async"
                  className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-44 lg:h-52"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-brand-muted">
            No gallery images yet.
          </p>
        )}
      </div>
    </section>
  )
}

export default GalleryTestimonialsSection
