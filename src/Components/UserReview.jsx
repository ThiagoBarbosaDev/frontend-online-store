import React from 'react';
import PropTypes from 'prop-types';

class UserReview extends React.Component {
  render() {
    const { data: { email, description, rating } } = this.props
    return (
      <section>
        <p>
          {email}
        </p>
        <p>
          {description}
        </p>
        <p>
          { `Rating: ${rating} stars` }
        </p>
      </section>
    );
  }
}

UserReview.propTypes = {
  data: PropTypes.shape({
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserReview;
