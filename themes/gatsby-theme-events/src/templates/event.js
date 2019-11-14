import React from 'react';
import { object, shape, string } from 'prop-types';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { MDXRenderer } from '@undataforum/gatsby-theme-base';
import { Avatars } from '@undataforum/components';

import EventPage from '../components/event-page';

const Event = ({ location, data }) => {
  const {
    displayType,
    title,
    displayDate,
    duration,
    moderators,
    speakers,
    description,
    registration,
    body,
  } = data.event;

  let profiles = speakers;
  // Add "(Moderator)" after name.
  // Combine moderators and speakers for EventPreview.
  if (moderators) {
    profiles = [
      ...moderators.map(moderator => ({
        ...moderator,
        name: `${moderator.name} (Moderator)`,
      })),
      ...speakers,
    ];
  }

  const event = {
    type: displayType,
    title() {
      // Return processed Markdown wrapped in Styled.h1.
      return <MDXRenderer>{title.childMdx.body}</MDXRenderer>;
    },
    date: displayDate,
    duration,
    speakers() {
      return (
        <Avatars
          values={profiles.map(profile => ({
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
            href: profile.path,
          }))}
          mb={3}
        />
      );
    },
    links: { registration },
  };
  return (
    <EventPage
      event={event}
      title={title.text}
      description={description.text}
      body={body}
      location={location}
    />
  );
};

Event.propTypes = {
  data: shape({ event: object.isRequired }).isRequired,
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Event;

export const pageQuery = graphql`
  query($id: String!) {
    event(id: { eq: $id }) {
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
        path
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
        path
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
      body
    }
  }
`;
