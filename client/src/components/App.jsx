import React from 'react';
import axios from 'axios';

// import loadable from '@loadable/component';
import StarRatingSummary from './StarRatingSummary.jsx';
import RecommendSummary from './RecommendSummary.jsx';
import Reviews from './Reviews.jsx';

// const StarRatingSummary = loadable(() => import('./StarRatingSummary.jsx'));
// const RecommendSummary = loadable(() => import('./RecommendSummary.jsx'));
// const Reviews = loadable(() => import('./Reviews.jsx'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: 5,
      overallRating: 0,
      ratingDistribution: [],
      reviews: [],
      clickedRating: null,
    };
    this.fetchReviews = this.fetchReviews.bind(this);
    this.countStarRating = this.countStarRating.bind(this);
    this.passClickedRating = this.passClickedRating.bind(this);
    this.handleHelpfulOrUnhelpful = this.handleHelpfulOrUnhelpful.bind(this);
  }

  componentDidMount() {
    this.fetchReviews();
  }

  fetchReviews() {
    let id = this.state.product_id;
    if (window.location.pathname !== '/') {
      const arr = window.location.pathname.split('/');
      // eslint-disable-next-line prefer-destructuring
      id = arr[1];
    }
    axios.get(`/api/reviews/${id}`)
      .then(({ data }) => {
        this.countStarRating(data);
      })
      .catch((err) => {
        throw err;
      });
  }

  countStarRating(reviews) {
    const starsCount = {
      one_stars: 0, two_stars: 0, three_stars: 0, four_stars: 0, five_stars: 0,
    };
    for (let i = 0; i < reviews.length; i++) {
      starsCount[reviews[i].star_rating]++;
    }
    let rating = (1 * starsCount.one_stars
      + 2 * starsCount.two_stars
      + 3 * starsCount.three_stars
      + 4 * starsCount.four_stars
      + 5 * starsCount.five_stars) / reviews.length;
    rating = Number.parseFloat(rating).toFixed(2);
    this.setState({
      ratingDistribution: starsCount,
      overallRating: rating,
      reviews,
    });
  }

  passClickedRating(clicked) {
    this.setState({
      clickedRating: clicked,
    });
  }

  handleHelpfulOrUnhelpful(keyName, reviewId) {
    for (let i = 0; i < this.state.reviews.length; i++) {
      if (this.state.reviews[i].review_id === reviewId) {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const copyReviews = this.state.reviews.slice();
        copyReviews[i][keyName]++;
        this.setState({
          reviews: copyReviews,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <h3 className="heading">RATINGS & REVIEWS</h3>
        <div className="reviews-container">
          <div className="inner-container">
            {this.state.reviews.length > 0 && (
            <StarRatingSummary
              reviews={this.state.reviews}
              overallRating={this.state.overallRating}
              ratingDistribution={this.state.ratingDistribution}
              clicked={this.passClickedRating}
            />
            )}
            {this.state.reviews.length > 0 && (
            <RecommendSummary reviews={this.state.reviews} />
            )}
          </div>
          {this.state.reviews.length > 0 && (
          <Reviews
            reviews={this.state.reviews}
            distribution={this.state.ratingDistribution}
            clickedRating={this.state.clickedRating}
            handleHelpfulOrUnhelpful={this.handleHelpfulOrUnhelpful}
          />
          )}
          {this.state.reviews.length === 0 && (<div className="test" />)}
        </div>
      </div>
    );
  }
}

export default App;
