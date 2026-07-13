import Button from '../Button'

const galleryImages = [
  'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=280&fit=crop',
  'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=280&fit=crop',
]

function GalleryTestimonialsSection() {
  return (
    <section id="gallery" className="bg-white py-16">
      <div className="mx-auto w-full max-w-page px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-nursery-green uppercase">
            Gallery
          </p>
          <h2 className="text-3xl font-extrabold text-nursery-dark">
            Moments of Joy
          </h2>
        </div>

        <div className="mb-8 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {galleryImages.map((src, i) => (
            <div key={i} className="overflow-hidden rounded-2xl shadow-sm">
              <img
                src={src}
                alt={`Gallery moment ${i + 1}`}
                className="h-36 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-44 lg:h-52"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline">View Gallery</Button>
        </div>
      </div>
    </section>
  )
}

export default GalleryTestimonialsSection
