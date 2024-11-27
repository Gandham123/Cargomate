import './index.css';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import StarIcon from '@mui/icons-material/Star';

const EachReviewCardEl=(props)=>{
    const{reviewData}=props;
    const{ ownerName,reviewMessage,rating}=reviewData;
    return(
        <>
         <div className='profile-each-review-container'>
            <div>
                <h1 className='profile-review-owner'>Load Owner</h1>
                <p className='profile-review-owner review-owner-name'>Mr.{ownerName}</p>
            </div>
            <div>
                <h1 className='profile-review-owner'>Message</h1>
                <p className='profile-review-owner review-message-styling'>{reviewMessage}</p>
            </div>
            <div>
            <h1 className='profile-review-owner'>Rating</h1>
            <Stack spacing={1}>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={rating}
                                    precision={0.5}
                                    readOnly
                                    icon={
                                    <StarIcon
                                        fontSize="inherit"
                                        sx={{
                                        color: '#FFD700', // Color for full stars
                                        }}
                                    />
                                    }
                                    emptyIcon={
                                    <StarIcon
                                        fontSize="inherit"
                                        sx={{
                                        color: '#000000', // Background color for empty stars
                                        }}
                                    />
                                    }
                                    sx={{
                                    fontSize: '30px', // Set star size
                                    '& .MuiRating-iconFilled': {
                                        marginRight: '13px', // Space between stars
                                    },
                                    '& .MuiRating-iconHalf': {
                                        color: '#FFD700', // Color for half-filled stars
                                        background: 'linear-gradient(90deg, #FFD700 50%, #D9D9D9 50%)', // Half-fill effect
                                        clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', // Only display the left half as filled
                                    },
                                    }}
                                />
                            </Stack>
            </div>
        </div>
        </>
    )
}
export default EachReviewCardEl;