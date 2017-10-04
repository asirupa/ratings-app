import React from 'react';
import Movie from './Movie';
import PropTypes from 'prop-types';
import { calulateRating, debounce } from '../utils/util';

const { string, array, func, bool } = PropTypes;
const BUFFER = 20;
class Movies extends React.PureComponent {
  static displayName = 'Movie';

  static propTypes = {
    data: array.isRequired,
    loading: bool,
    error: string,
    done: bool,
    fetchNext: func,
  };

  static defaultProps = {
    fetchNext: () => {},
  };

  state = {
    showDetails: false,
    movie: null,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    if (this.state.showDetails) {
      this.details && this.details.focus();
    }
  }

  componentDidUpdate() {
    if (this.state.showDetails) {
      this.details && this.details.focus();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', debounce(this.onScroll, 100));
  }

  onScroll = () => {
    if (
      document.body.clientHeight - window.innerHeight - BUFFER <=
      window.scrollY
    ) {
      this.fetchNext();
    }
  };

  handleItemClick = movieId => {
    const movies = this.props.data;
    this.setState({
      showDetails: true,
      movie: movies.find(movie => movie.movieId === movieId),
    });
  };

  renderDetails() {
    const { showDetails, movie } = this.state;
    const active = showDetails && !!movie;

    const { movieId, totalRating, hits, imgSrc } = movie || {};
    return (
      <div
        ref={c => (this.details = c)}
        className={`movieRatingDetails ${active ? 'open' : ''}`}
        tabIndex={0}
        onBlur={this.hideDetails}
      >
        <div className="close" onClick={this.hideDetails}>
          X
        </div>
        <div>
          <img src={imgSrc} alt="Movie" />
        </div>
        <div className="movieRatingDetailsText">
          <div>Movie Id: {movieId}</div>
          <div>Total Rating: {totalRating}</div>
          <div>Number of ratings: {hits}</div>
          <div>Rating: {calulateRating(totalRating, hits)}</div>
        </div>
      </div>
    );
  }

  render() {
    const { data = [], loading, error, page } = this.props;

    if (page === 1) {
      if (loading) {
        return <div className="loader" />;
      } else if (error) {
        return <div className="loader">Error loading the page</div>;
      } else if (data.length === 0) {
        return <div className="loader">No movies found</div>;
      }
    }

    const loadMore =
      page > 1 && (loading || error) ? (
        <div className="loaderMore">
          {error ? 'Loading more...' : 'Error loading more'}
        </div>
      ) : null;

    return (
      <div className="container">
        <div className="moviesList">
          {(data || []).map((movie, i) => {
            return (
              <Movie
                key={`movie${i}`}
                {...movie}
                onItemClick={this.handleItemClick}
              />
            );
          })}
        </div>
        <div>{loadMore}</div>
        {this.renderDetails()}
      </div>
    );
  }

  hideDetails = () => {
    this.setState({ showDetails: false, movie: null });
  };

  fetchNext = () => {
    !this.props.done && this.props.fetchNext();
  };
}

export default Movies;
