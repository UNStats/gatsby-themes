import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Flex, Text } from '@undataforum/components';
import styled from 'styled-components';
import { borderColor, borderBottom } from 'styled-system';
import useNormalizedProfiles from '../hooks/useNormalizedProfiles';
import { normalizePost } from '../fragments/PostPreview';
import Profiles from './Profiles';
import Posts from './Posts';
import Container from './Container';
import { colorType } from '../types';
import Heading from './Heading';

const PostsWithBottomBorder = styled(Posts)`
  ${borderBottom}
  ${borderColor}
`;

const BlogPreview = ({ color = 'primary', ...props }) => {
  // Get normalized profiles for author lookup.
  const profiles = useNormalizedProfiles();
  // Tier 1 posts are previewed with author avatars and lead.
  // Tier 2 posts are previewed with author names only and no lead.
  const {
    tier1: { nodes: tier1PostsFromGql },
    tier2: { nodes: tier2PostsFromGql },
  } = useStaticQuery(graphql`
    query blogPreview {
      tier1: allMdx(
        filter: { fields: { type: { eq: "post" } } }
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
        limit: 2
      ) {
        nodes {
          ...PostPreview
        }
      }
      tier2: allMdx(
        filter: { fields: { type: { eq: "post" } } }
        sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
        limit: 4
        skip: 2
      ) {
        nodes {
          ...PostPreview
        }
      }
    }
  `);

  const tier1Posts = tier1PostsFromGql
    .map(normalizePost)
    .map(({ authors, ...post }) => ({
      ...post,
      authors: function Authors() {
        return (
          <Profiles
            profiles={profiles
              .filter(({ slug }) => authors.includes(slug))
              .map(({ id, name, avatar }) => ({
                id,
                name,
                avatar,
              }))}
          />
        );
      },
    }));

  const tier2Posts = tier2PostsFromGql
    .map(normalizePost)
    .map(({ authors, ...post }) => ({
      ...post,
      authors: function Authors() {
        return (
          <Text as="div" color="text" lineHeight="title" mb={3}>
            {profiles
              .filter(({ slug }) => authors.includes(slug))
              .map(({ name }) => name)
              .join(', ')}
          </Text>
        );
      },
      lead: undefined,
    }));

  return (
    <Container {...props}>
      <Heading color={color} mb={4}>
        Blog
      </Heading>
      <Flex {...props} flexDirection={['column', 'row']}>
        <PostsWithBottomBorder
          flex={3}
          posts={tier1Posts}
          borderColor={color}
          borderBottom={['1px solid', 'none']}
          color={color}
          fontSize={[3, 4]}
          mr={[0, 3, 4]}
          mb={[3, 0]}
        />
        <Posts flex={2} posts={tier2Posts} color={color} fontSize={[2, 3]} />
      </Flex>
    </Container>
  );
};

BlogPreview.propTypes = {
  color: colorType,
};

export default BlogPreview;
