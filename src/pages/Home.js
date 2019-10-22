import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Image } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  if (data) {
    console.log(data);
  }
  console.log(loading);

  return (
    <div>
      {/* <h1>Home Page</h1> */}
      <Grid columns={3} divided>
        <Grid.Row>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            {/* <Image src="/images/wireframe/media-paragraph.png" /> */}
            {loading ? (
              <h1>loading posts ...</h1>
            ) : (
              data.posts &&
              data.posts.map(post => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;
