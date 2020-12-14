import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Stars from './StarScale.jsx';
// import loadable from '@loadable/component';

// const Stars = loadable(() => import('./StarScale.jsx'));

class NewestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      savedReviewIds: [],
    };
    this.saveReview = this.saveReview.bind(this);
    this.updateHelpfulNum = this.updateHelpfulNum.bind(this);
    this.updateUnHelpfulNum = this.updateUnHelpfulNum.bind(this);
  }

  saveReview(e) {
    const newR = JSON.parse(e.target.value);
    const { saved, savedReviewIds } = this.state;
    if (savedReviewIds.indexOf(newR.review_id) === -1) {
      const newSaved = [newR, ...saved];
      const newSavedIds = [newR.review_id, ...savedReviewIds];
      this.setState({
        saved: newSaved,
        savedReviewIds: newSavedIds,
      });
      this.props.pushUpSaved(newSaved);
    }
    e.preventDefault();
  }

  updateHelpfulNum(e) {
    const oldHelpful = JSON.parse(e.target.value);
    this.props.handleHelpfulOrUnhelpful('helpful', oldHelpful.review_id);
    let helpful_votes = oldHelpful.helpful + 1 ;
    axios.put(`/api/reviews/${oldHelpful.review_id}/helpful/${helpful_votes}`);
  }

  updateUnHelpfulNum(e) {
    const oldUnHelpful = JSON.parse(e.target.value);
    this.props.handleHelpfulOrUnhelpful('unhelpful', oldUnHelpful.review_id);
    let unhelpful_votes = oldUnHelpful.unhelpful + 1 ;
    axios.put(`/api/reviews/${oldUnHelpful.review_id}/unhelpful/${unhelpful_votes}`);
  }

  render() {
    const { reviews } = this.props;
    const starsNums = {
      one_stars: 1, two_stars: 2, three_stars: 3, four_stars: 4, five_stars: 5,
    };
    return (
      <div>
        {reviews.map((review) => (
          <div className="wrap" key={review.review_id}>
            <div className="stars">
              <Stars ratio={starsNums[review.star_rating]} id={review.review_id} />
            </div>
            <time className="date">{review.create_date}</time>
            <div className="comment-title">
              {review.comment.split('.')[0]}
            </div>
            <div className="comment">
              {review.comment}
            </div>
            <div className="name">
              <span>{review.name}</span>
            </div>
            <div className="bookmark">
              <div>
                Would you like to save this review?
              </div>
              <div>
                <button className="bookmark-button" type="button" onClick={this.saveReview} value={JSON.stringify(review)}>Yes</button>
                {this.state.savedReviewIds.indexOf(review.review_id) > -1 && <span className="saved">Saved!</span>}
              </div>
            </div>
            <div className="helpfulOrNot">
              Was this review helpful?
              <button type="button" className="bookmark-button" value={JSON.stringify(review)} onClick={this.updateHelpfulNum}>
                Yes [
                {review.helpful}
                ]
              </button>
              <button type="button" className="bookmark-button" value={JSON.stringify(review)} onClick={this.updateUnHelpfulNum}>
                No [
                {review.unhelpful}
                ]
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

NewestView.propTypes = {
  reviews: PropTypes.array.isRequired,
  pushUpSaved: PropTypes.func.isRequired,
  handleHelpfulOrUnhelpful: PropTypes.func.isRequired,
};

export default NewestView;
