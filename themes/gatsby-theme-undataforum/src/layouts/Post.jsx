import React from 'react';
import { object } from 'prop-types';
import { graphql } from 'gatsby';
import { PostPreview } from '@undataforum/components';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Profiles from '../components/Profiles';
import Container from '../components/Container';
import { ProfilesConsumer } from '../components/ProfilesContext';

const Post = ({ data: { mdx } }) => {
  const {
    id,
    frontmatter: { title, date, authors },
    code: { body },
  } = mdx;
  return (
    <ProfilesConsumer>
      {({ profilesWithMediumAvatar }) => {
        const profiles = profilesWithMediumAvatar
          .filter(({ slug }) => authors.includes(slug))
          .map(({ avatar, name, href }) => ({
            avatar,
            name,
            href,
          }));
        const renderAuthors = () => (
          <Profiles profiles={profiles} linkProfiles />
        );
        return (
          <Container>
            <PostPreview
              post={{
                id,
                title,
                date,
                authors: renderAuthors,
              }}
            />
            <MDXRenderer>{body}</MDXRenderer>
          </Container>
        );
      }}
    </ProfilesConsumer>
  );
};

Post.propTypes = {
  data: object.isRequired,
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      fields {
        path
      }
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        authors
      }
      code {
        body
      }
    }
  }
`;
