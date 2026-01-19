import React from 'react'

const Card = ({ 
  title, 
  description, 
  image, 
  action,
  variant = 'editorial' // 'editorial' | 'product' | 'note'
}) => {
  const variants = {
    editorial: 'bg-warm-off-white',
    product: 'bg-white border-0',
    note: 'bg-warm-off-white border-l-4 border-muted-gold',
  }
  
  return (
    <div className={`${variants[variant] || variants.editorial} rounded-sm overflow-hidden transition-opacity hover:opacity-95`}>
      {image && (
        <div className="w-full h-64 bg-deep-olive bg-cover bg-center">
          {typeof image === 'string' ? (
            <div className="w-full h-full bg-gradient-to-br from-deep-olive to-olive-green"></div>
          ) : image}
        </div>
      )}
      <div className="p-xl">
        {title && (
          <h3 className="text-soft-charcoal text-xl font-bold font-sans mb-md">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-soft-charcoal text-base font-sans leading-relaxed mb-lg">
            {description}
          </p>
        )}
        {action && (
          <div className="mt-lg">
            {action}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
