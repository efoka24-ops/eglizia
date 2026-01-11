// Logo component with Mat 11:28 reference
export default function Logo({ size = 'normal' }) {
  const sizes = {
    small: 'w-8 h-8',
    normal: 'w-12 h-12',
    large: 'w-20 h-20'
  }

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg`}>
      <svg className="w-2/3 h-2/3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m-9-9h18" />
      </svg>
    </div>
  )
}
