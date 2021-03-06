import { gql } from 'apollo-boost';

export const recipeFragments = {
  recipe: gql`
    fragment completeRecipe on Recipe {
      _id
      name
      category
      description
      instructions
      createdDate
      likes
      username
    }
  `,
  like: gql`
    fragment LikeRecipe on Recipe {
      _id
      likes
    }
  `
}