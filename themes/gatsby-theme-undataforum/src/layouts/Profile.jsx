import React from 'react';
import { object } from 'prop-types';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Posts from '../components/Posts';
import Container from '../components/Container';
import { postMap } from '../fragments/PostPreview';
import { ProfilesConsumer } from '../components/ProfilesContext';
import Profiles from '../components/Profiles';
import ProfilePreview, {
  largeAvatarProfileMap,
} from '../fragments/ProfilePreview';

const removeHref = profile => {
  // eslint-disable-next-line no-unused-vars
  const { href, ...rest } = profile;
  return { ...rest };
};

const Profile = ({
  data: {
    profile: profileFromGql,
    posts: { nodes: postsFromGql },
  },
}) => {
  const {
    code: { body },
    ...profile
  } = profileFromGql;
  return (
    <ProfilesConsumer>
      {({ profilesWithSmallAvatar }) => (
        <Container>
          <ProfilePreview
            profile={removeHref(largeAvatarProfileMap(profile))}
            mb={4}
          />
          <MDXRenderer>{body}</MDXRenderer>
          <Posts
            posts={postsFromGql.map(postMap).map(({ authors, ...post }) => {
              const renderAuthors = () => (
                <Profiles
                  profiles={authors
                    .map(author =>
                      profilesWithSmallAvatar.find(
                        ({ slug }) => slug === author
                      )
                    )
                    .map(({ name, avatar }) => ({
                      name,
                      avatar,
                    }))}
                />
              );
              return {
                ...post,
                authors: renderAuthors,
              };
            })}
          />
        </Container>
      )}
    </ProfilesConsumer>
  );
};

Profile.propTypes = {
  data: object.isRequired,
};

export default Profile;

export const profileQuery = graphql`
  query($slug: String!) {
    profile: mdx(fields: { slug: { eq: $slug } }) {
      ...ProfilePreview
      code {
        body
      }
    }
    posts: allMdx(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { authors: { in: [$slug] } }
      }
    ) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
