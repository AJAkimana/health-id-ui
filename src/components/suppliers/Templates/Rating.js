import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import { supplyStyles } from '../../../assets/styles/suppliers/suppliers';

const Rating = (props) => {
  const createStars = (stars) => {
    let allStars = stars;
    const starArray = [];

    for (let i = 0; i < 5; i += 1) {
      starArray.push((
        <StarIcon
          key={i}
          style={(allStars < 1) ? supplyStyles.emptyStar : supplyStyles.starStyle}
        />
      ));

      allStars -= 1;
    }

    return starArray;
  };

  const { rating } = props;
  return (
    <Fragment>
      {createStars(rating)}
    </Fragment>
  );
};

Rating.propTypes = {
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

Rating.defaultProps = {
  rating: ''
};

export default Rating;
