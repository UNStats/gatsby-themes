import React from 'react';
import { object, shape, string } from 'prop-types';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import { MDXRenderer } from '@undataforum/gatsby-theme-base';
import { Heading } from '@undataforum/components';
import EventPage from '../components/event-page';
import ProfileList from '../components/profile-list';

const Event = ({ location, data }) => {
  const {
    displayType,
    title,
    displayDate,
    duration,
    moderators,
    speakers,
    description,
    body,
  } = data.event;

  let profiles = speakers;
  // Add moderator badge to moderators.
  if (moderators) {
    profiles = [
      ...moderators.map(moderator => ({
        ...moderator,
        badges: [{ text: 'Moderator', mode: 'secondary' }],
      })),
      ...speakers,
    ];
  }

  const event = {
    type: displayType,
    title() {
      return (
        <Heading as="h1" fontSize={[4, 5]}>
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
            href: profile.path,
            badges: profile.badges,
          }))}
        />
      );
    },
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
      body
    }
  }
`;
