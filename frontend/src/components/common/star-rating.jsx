import React from 'react'
import { StarIcon } from 'lucide-react'

const StarRating = ({ rating, handleRating, size }) => {
    return (
        [1, 2, 3, 4, 5].map((star, index) => (

            <StarIcon className={`${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'fill-white'}`}
                onClick={handleRating ? () => handleRating(star) : null}
                key={index}
                size={size}
            />

        ))
    )
}

export default StarRating
