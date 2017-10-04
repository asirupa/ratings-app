import React from 'react';
import PropTypes from 'prop-types';

const { string, array, bool } = PropTypes;

export default class Stats extends React.PureComponent {
  static displayName = 'Stats';

  static propTypes = {
    data: array,
    loading: bool,
    error: string,
  };

  static defaultProps = {
    pushMovies: () => {},
  };

  render() {
    const { totalMovies = 0, totalRatings = 0, averageRating = 0 } = this.props;

    return (
      <div className="pageHeader">
        <div className="stats">
          <div className="stat">
            {' '}
            <div className="statCount">{totalMovies}</div>
            <div>Total Movies</div>
          </div>
          <div className="stat">
            {' '}
            <div className="statCount">{totalRatings}</div>
            <div>Total Ratings</div>
          </div>
          <div className="stat">
            {' '}
            <div className="statCount">{averageRating}</div>
            <div>Average rating</div>
          </div>
        </div>
      </div>
    );
  }
}
