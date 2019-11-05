import React from 'react';
import { object, shape, string } from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Box, Heading } from '@undataforum/components';
import { MDXRenderer } from '@undataforum/gatsby-theme-base';

import EventsPage from '../components/events-page';
import ProfileList from '../components/profile-list';

const Events = ({ data, pageContext, location }) => {
  const events = data.allEvent.nodes.map(event => {
    const {
      id,
      displayType,
      title,
      displayDate,
      duration,
      moderators,
      speakers,
      description,
      registration,
      path,
    } = event;

    let profiles = speakers;
    // Merge moderators and speakers for EventPreview.
    if (moderators) {
      profiles = [...moderators, ...speakers];
    }

    return {
      id,
      type: displayType,
      title() {
        return (
          <Heading as="h1" fontSize={[4, 5]} color="text">
            <MDXRenderer>{title.childMdx.body}</MDXRenderer>
          </Heading>
        );
      },
      date: displayDate,
      duration,
      speakers() {
        return (
          <ProfileList
            profiles={profiles.map(profile => ({
              id: profile.id,
              avatar() {
                return (
                  <Img
                    style={{ borderRadius: '100%' }}
                    alt={profile.name}
                    fixed={profile.avatar.childImageSharp.fixed}
                  />
                );
              },
              name: profile.name,
            }))}
          />
        );
      },
      description() {
        return (
          <Box color="text">
            <MDXRenderer>{description.childMdx.body}</MDXRenderer>
          </Box>
        );
      },
      links: { page: path, registration },
    };
  });
  return (
    <EventsPage
      events={events}
      title={pageContext.title}
      description={pageContext.description}
      location={location}
    />
  );
};

Events.propTypes = {
  data: shape({ allEvent: object.isRequired }).isRequired,
  pageContext: shape({
    title: string.isRequired,
    description: string,
  }),
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Events;

export const pageQuery = graphql`
  query($type: String!) {
    allEvent(
      sort: { fields: startDate, order: DESC }
      filter: { type: { eq: $type } }
    ) {
      nodes {
        id
        displayType
        title {
          childMdx {
            body
          }
          text
        }
        displayDate
        duration
        moderators {
          id
          name
          avatar {
            childImageSharp {
              fixed(height: 64, width: 64) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        speakers {
          id
          name
          avatar {
            childImageSharp {
              fixed(height: 64, width: 64) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
        description {
          childMdx {
            body
          }
          text
        }
        registration
        path
      }
    }
  }
`;
