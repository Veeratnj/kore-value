import services from "../../content/Services.json"

type ServiceItem = {
  title: string
  slogan: string
  href?: string
}

type ServicesModalProps = {
  open: boolean
  onClose: () => void
}

export default function ServicesModal({ open, onClose }: ServicesModalProps) {
  if (!open) return null

  const handleCardClick = (href?: string) => {
    if (!href) return
    if (href.startsWith("#")) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      window.location.href = href
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-10"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-[780px] max-h-[80vh] overflow-y-auto rounded-[34px] border border-[#436900] bg-[#0B120B] p-6 lg:p-10 custom-scrollbar"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="absolute right-6 top-6 text-[#77B900] text-2xl hover:text-[#9fdc00]"
          onClick={onClose}
          aria-label="Close services modal"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <h2 className="text-[#77B900] text-[28px] lg:text-[36px] font-semibold">
            {services.title}
          </h2>
          <p className="text-[#7E7E7E] text-[16px] lg:text-[18px] mt-3 max-w-[820px] mx-auto">
            {services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.items.map((service: ServiceItem, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => handleCardClick(service.href)}
              className="group w-full max-w-[320px] rounded-[26px] border border-[#283E00] bg-[#131814] p-5 text-left hover:bg-[#1A1F1A] transition"
            >
              <h3 className="text-white text-[16px] lg:text-[18px] font-semibold mb-2 group-hover:text-[#9fdc00]">
                {service.title}
              </h3>
              <p className="text-[#9E9E9E] text-[13px] leading-[22px]">
                {service.slogan}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
