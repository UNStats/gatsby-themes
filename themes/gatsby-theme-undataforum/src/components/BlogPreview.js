import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Box, Flex, Heading, Text } from '@undataforum/components';
import { borderColor, borderBottom } from 'styled-system';
import { useNormalizedProfiles } from '../hooks';
import { normalizePost } from '../helpers';
import { colorType } from '../types';
import PostList from './PostList';
import Profiles from './ProfileList';

const BlogPreview = ({ color = 'primary', ...props }) => {
  // Get normalized profiles for author lookup.
  const profiles = useNormalizedProfiles();
  // Tier 1 posts are previewed with author avatars and lead.
  // Tier 2 posts are previewed with author names and no lead.
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
    .map(({ authors, ...post }) => {
      const renderAuthors = () => (
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
      return {
        ...post,
        authors: renderAuthors,
      };
    });

  const tier2Posts = tier2PostsFromGql
    .map(normalizePost)
    .map(({ authors, ...post }) => {
      const renderAuthors = () => (
        <Text as="div" color="text" lineHeight="title" mb={3}>
          {profiles
            .filter(({ slug }) => authors.includes(slug))
            .map(({ name }) => name)
            .join(', ')}
        </Text>
      );
      return {
        ...post,
        authors: renderAuthors,
        lead: undefined,
      };
    });

  return (
    <Box {...props}>
      <Heading as="h1" fontSize={5} color={color} mb={4}>
        Blog
      </Heading>
      <Flex {...props} flexDirection={['column', 'row']}>
        <PostList
          css={`
            ${borderBottom}
            ${borderColor}
          `}
          flex={3}
          posts={tier1Posts}
          borderColor={color}
          borderBottom={['1px solid', 'none']}
          color={color}
          fontSize={[3, 4]}
          mr={[0, 3, 4]}
          mb={[3, 0]}
        />
        <PostList flex={2} posts={tier2Posts} color={color} fontSize={[2, 3]} />
      </Flex>
    </Box>
  );
};

BlogPreview.propTypes = {
  color: colorType,
};

export default BlogPreview;
