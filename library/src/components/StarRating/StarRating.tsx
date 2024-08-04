import React from 'react';
import './StarRating.css';
import Star0 from '../../assets/star-0.svg';
import Star1 from '../../assets/star-1.svg';
import Star2 from '../../assets/star-2.svg';
import Star3 from '../../assets/star-3.svg';
import Star4 from '../../assets/star-4.svg';
import Star5 from '../../assets/star-5.svg';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const roundedRating = Math.round(rating);
  const getStarSVG = (rating: number) => {
    switch (rating) {
      case 0:
        return Star0;
      case 1:
        return Star1;
      case 2:
        return Star2;
      case 3:
        return Star3;
      case 4:
        return Star4;
      case 5:
        return Star5;
      default:
        return Star0;
    }
  };

  return (
    <div className="star-rating">
      <img src={getStarSVG(roundedRating)} alt={`Rating: ${roundedRating}`} />
      {rating}
    </div>
  );
};

export default StarRating;
