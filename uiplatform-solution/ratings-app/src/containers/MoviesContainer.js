import React from 'react';
import { connect } from 'react-redux';
import Movies from '../components/Movies';
import Stats from '../components/Stats';
import * as MoviesAction from '../actions/MoviesAction';
import ExecutionEnvironment from 'exenv';
import * as Constants from '../utils/constants';

class MoviesContainer extends React.Component {
  componentWillMount() {
    if (ExecutionEnvironment.canUseDOM) {
      this.props.fetchMovies();
    }
  }

  componentDidMount() {
    this.createSocket();
  }

  componentDidUpdate() {
    if (!this.socket) {
      this.createSocket();
    }
  }

  componentWillUnmount() {
    this.socket && this.socket.close();
    this.socket = null;
    this.socketOpen = false;
    this.poll && clearInterval(this.poll);
  }

  createSocket() {
    this.socket = new WebSocket('ws://localhost:3001');
    this.socket.onopen = () => this.onSocketOpen();
    this.socket.onmessage = m => this.onSocketData(m);

    //Poll for the ratings for the visible movies only
    //This is to avoid overlading server especially when paginating
    //This should ideally be inside a webworker
    this.poll = setInterval(this.sendMovies, 200);
  }

  onSocketOpen() {
    console.log('Connection established!');
    this.socketOpen = true;
  }

  onSocketData(message) {
    const data = message.data;
    if (typeof data === 'string') {
      try {
        const result = JSON.parse(data);
        if (result.movies) {
          this.props.pushMovies(result);
        } else if (result.stats) {
          this.props.pushData(result);
        }
      } catch (e) {
        console.log(data);
      }
    }
  }

  sendMovies = () => {
    const movies = this.props.movies ? this.props.movies.data : [];
    const movieIds = movies.map(movie => movie.movieId);
    if (this.socketOpen) {
      this.socket.send(JSON.stringify({ movieIds }));
    }
  };

  renderTop() {
    return (
      <header className="pageTop">
        <div className="appLogo" />
        <div className="pageTitle">Ratings app</div>
      </header>
    );
  }

  renderActions() {
    const { category } = this.props.movies;
    const actions = [
      {
        category: Constants.ALL,
        text: 'All',
        title: 'All movies',
        onClick: this.props.fetchMovies.bind(this, Constants.ALL),
      },
      {
        category: Constants.POPULAR,
        text: 'Popular Movies',
        title:
          'All movies that have more than 500 ratings and average rating of 3 and above',
        onClick: this.props.fetchMovies.bind(this, Constants.POPULAR),
      },
      {
        category: Constants.WORST,
        text: 'Worst Movies',
        title:
          'All movies that have more than 500 ratings and average rating of below 3',
        onClick: this.props.fetchMovies.bind(this, Constants.WORST),
      },
    ];

    const arr = actions.map(action => {
      const isActive = category === action.category;
      return (
        <span
          title={action.title}
          key={action.category}
          className={`action ${isActive && 'active'}`}
          onClick={!isActive ? action.onClick : null}
        >
          {' '}
          {action.text}{' '}
        </span>
      );
    });

    return arr;
  }

  renderHeader() {
    return (
      <div className="pageHeader">
        <Stats {...this.props.stats} />

        <div className="pageActions">{this.renderActions()}</div>
      </div>
    );
  }

  renderBody() {
    const movies = this.props.movies || {};
    return (
      <div className="pageBody">
        <Movies
          {...movies}
          pushMovies={this.props.pushMovies}
          fetchNext={this.props.fetchNext}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderTop()}
        <div className="ratingsApp">
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: category => {
      dispatch(MoviesAction.fetchMovies(category));
    },
    fetchNext: () => {
      dispatch(MoviesAction.fetchNext());
    },
    pushMovies: data => {
      dispatch(MoviesAction.pushMovies(data));
    },
    pushData: data => {
      dispatch(MoviesAction.pushData(data));
    },
    fetchStats: () => {
      dispatch(MoviesAction.fetchStats());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
