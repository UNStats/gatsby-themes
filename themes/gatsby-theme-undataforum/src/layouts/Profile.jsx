import React from 'react';
import { shape, object } from 'prop-types';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Posts from '../components/Posts';
import Container from '../components/Container';
import Profiles from '../components/Profiles';
import { normalizePost } from '../fragments/PostPreview';
import ProfilePreview, { normalizeProfile } from '../fragments/ProfilePreview';
import useNormalizedProfiles from '../hooks/useNormalizedProfiles';
import Heading from '../components/Heading';

const Profile = ({
  data: {
    profile: profileFromGql,
    posts: { nodes: postsFromGql },
  },
}) => {
  // Extract body with transformed MDX.
  const {
    code: { body },
  } = profileFromGql;
  const profile = normalizeProfile(profileFromGql);
  // Do not link ProfilePreview at the top of the profile page.
  profile.href = undefined;

  // Use profiles to look up author profiles for posts.
  const profiles = useNormalizedProfiles();

  // Lookup author profiles for posts.
  const posts = postsFromGql.map(normalizePost).map(({ authors, ...post }) => ({
    ...post,
    authors: function Authors() {
      return (
        <Profiles
          profiles={profiles
            .filter(({ slug }) => authors.includes(slug))
            // Omit href to make sure that profiles are not linked.
            .map(({ id, name, avatar }) => ({ id, name, avatar }))}
        />
      );
    },
    lead: undefined,
  }));

  return (
    <Container>
      <ProfilePreview profile={profile} mb={4} />
      <MDXRenderer>{body}</MDXRenderer>
      <Heading color="text" fontFamily="sans" my={4}>{`Posts by ${
        profile.name
      }`}</Heading>
      <Posts color="text" posts={posts} />
    </Container>
  );
};

// Data returned from Gql is not normalized, therefore keep prop types generic.
Profile.propTypes = {
  data: shape({ profile: object.isRequired, posts: object.isRequired })
    .isRequired,
};

export default Profile;

export const profileQuery = graphql`
  query($slug: String!) {
    profile: mdx(fields: { slug: { eq: $slug } }) {
      ...ProfilePreview
      ...LargeAvatar
      code {
        body
      }
    }
    posts: allMdx(
      filter: {
        fields: { type: { eq: "post" } }
        frontmatter: { authors: { in: [$slug] } }
      }
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      nodes {
        ...PostPreview
      }
    }
  }
`;
