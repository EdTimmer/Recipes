import React from 'react';

import { Mutation } from 'react-apollo';
import { LIKE_RECIPE } from '../../queries';
import withSession from '../withSession';

class LikeRecipe extends React.Component {
  state = {
    liked: false,
    username: ''
  }

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
      this.setState({ 
        liked: prevLiked,
        username 
      });
    }
  }

  handleClick = likeRecipe => {
    this.setState(prevState => ({
      liked: !prevState.liked
    }),
      () => this.handleLike(likeRecipe)
    );

  }

  handleLike = (likeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async ({ data }) => {
        console.log(data);
        await this.props.refetch();
      })
    }
    else {
      //unlike recipe mutation
      console.log('unlike');
    }

  }

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
        {
          likeRecipe => (
            username && <button onClick={() => this.handleClick(likeRecipe)}>
            
            {liked ? 'Liked' : 'Like'}
            
            </button>
          )
        }
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe);