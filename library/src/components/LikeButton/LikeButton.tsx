import React, { useState, useEffect } from 'react';
import './LikeButton.css';
import EmptyHeart from '../../assets/empty-like.svg';
import FilledHeart from '../../assets/filled-like.svg';
import { likeBook, unlikeBook } from '../../services/api';

interface LikeButtonProps {
  bookId: string;
  token: string;
  isLiked: boolean;
  onUnlike?: (bookId: string) => void; 
}

const LikeButton: React.FC<LikeButtonProps> = ({ bookId, token, isLiked, onUnlike }) => {
  const [liked, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked); 
  }, [isLiked]);

  const toggleLike = async () => {
    try {
      console.log('Toggling like for book with ID:', bookId);
      if (liked) {
        await unlikeBook(bookId, token);
        setLiked(false);
        if (onUnlike) {
          onUnlike(bookId); 
        }
      } else {
        await likeBook(bookId, token);
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <button className="like-button" onClick={toggleLike}>
      <img src={liked ? FilledHeart : EmptyHeart} alt="Like" />
    </button>
  );
};

export default LikeButton;
