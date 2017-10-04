import React from 'react';
import PropTypes from 'prop-types';
import { calulateRating } from '../utils/util';

const { string, number, func } = PropTypes;

export default class Movie extends React.PureComponent {
  static displayName = 'Movie';

  static propTypes = {
    imgSrc: string,
    title: string,
    movieId: number,
    hits: number,
    averageRating: number,
    onItemClick: func,
  };

  static defaultProps = {
    onItemClick: () => {},
  };

  onClick = () => {
    this.props.onItemClick(this.props.movieId);
  };

  render() {
    const { totalRating, hits } = this.props;
    const rating = calulateRating(totalRating, hits, 10);
    return (
      <div className="movie" onClick={this.onClick}>
        <div className="movieImg">
          <img alt="movie" src={this.props.imgSrc} />
        </div>
        <div className="movieDetails">
          <div className="mDetails">
            <div>Average rating:&nbsp;{this.props.averageRating}</div>
            <div>Total ratings:&nbsp;{this.props.hits} </div>
          </div>
          <div className="mRating">{rating}</div>
        </div>
      </div>
    );
  }
}
