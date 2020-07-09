import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import FavoritePoster from "../../Components/FavoritePoster";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
`;

const DelBtn = styled.button`
  color:red;
`;


const FavoritePresenter = ({ favoriteMovies, loading, error }) => { 

 
  
  return (
  <>
    <Helmet>
      <title>Favorites | Nomflix</title>
    </Helmet>

    {loading ? (
      <Loader />
    ) : (
      <Container>
        {favoriteMovies && favoriteMovies.length > 0 && (
          <Section title="내가 찜한 콘텐츠">
            {favoriteMovies.map(movie => (
                <>
                <DelBtn>삭제</DelBtn>
                <FavoritePoster
                  isMovie={movie.isMovie}
                  key={movie.movieId}
                  id={movie.movieId}
                  imageUrl={movie.moviePost}
                  title={movie.movieTitle}
                  year={movie.movieYear}
                  rating={movie.movieRating}
                />
              </>
            
            ))}
            
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
) };

FavoritePresenter.propTypes = {
  favoriteMovies: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default withRouter(FavoritePresenter);