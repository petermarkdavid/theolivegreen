import React from 'react'

const Card = ({
  title,
  description,
  image,
  imageAlt = '',
  action,
  variant = 'editorial',
}) => {
  const variants = {
    editorial: 'card-grove',
    product: 'card-grove',
    /* Soft accent — no heavy divider; warm sand line */
    note: 'card-grove border-l-2 border-secondary/25',
  }

  return (
    <div
      className={`${variants[variant] || variants.editorial} overflow-hidden rounded-md transition-all duration-grove`}
    >
      {image && (
        <div className="h-64 w-full overflow-hidden bg-deep-olive">
          {typeof image === 'string' &&
          (image.startsWith('/') || image.startsWith('http')) ? (
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : typeof image === 'string' ? (
            <div className="h-full w-full bg-gradient-to-br from-deep-olive to-primary/90" />
          ) : (
            image
          )}
        </div>
      )}
      <div className="p-xl">
        {title && (
          <h3 className="font-headline mb-md text-xl font-semibold tracking-tight text-on-surface md:text-2xl">
            {title}
          </h3>
        )}
        {description && (
          <div className="font-body text-body-lg text-on-surface-variant mb-lg leading-relaxed">{description}</div>
        )}
        {action && <div className="mt-lg">{action}</div>}
      </div>
    </div>
  )
}

export default Card
