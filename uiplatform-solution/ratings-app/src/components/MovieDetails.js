import React from 'react';
import PropTypes from 'prop-types';

const { string, number, func } = PropTypes;

export default class Movie extends React.PureComponent {
  static displayName = 'Movie';

  static propTypes = {
    imgSrc: string,
    title: string,
    movieId: number,
    onItemClick: func,
  };

  static defaultProps = {
    onItemClick: () => {},
  };

  render() {
    return (
      <div className="movie">
        <div className="movieImg">
          <img alt="movie" src={this.props.imgSrc} />
        </div>
        <div className="movieDetails">
          Average rating: &nbsp; {this.props.averageRating} &nbsp; Total
          ratings:&nbsp;{this.props.hits}{' '}
        </div>
      </div>
    );
  }
}
