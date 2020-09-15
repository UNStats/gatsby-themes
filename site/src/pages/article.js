import React from 'react';
import { shape, string } from 'prop-types';
import { Layout } from '@undataforum/gatsby-theme-base';
import { Box, Container, Divider, Flex, Image, Styled } from 'theme-ui';

import { image01, image02, image03 } from '../../content';

const Article = ({ location }) => (
  <Layout location={location}>
    <Container variant="narrow" mb={4}>
      <Styled.h1>Story Layout</Styled.h1>
      <Styled.h2>Introduction</Styled.h2>
      <Styled.p>
        Esse Lorem excepteur consectetur id elit nulla ea irure nostrud ullamco.
        Est dolor id aliquip exercitation est tempor. Dolore sint do sint
        eiusmod sunt sint labore tempor elit elit nostrud enim cillum velit.
        Aute veniam tempor sunt minim pariatur ullamco cillum irure commodo
        voluptate nostrud est.
      </Styled.p>
      <Styled.p>
        Non quis anim excepteur mollit cupidatat in nostrud tempor labore. Qui
        velit non do voluptate adipisicing eiusmod incididunt dolore sunt.
        Aliquip ullamco anim aliqua ipsum deserunt ullamco qui aliquip ipsum ea
        ex labore. Commodo dolor minim dolor laborum. Adipisicing quis magna
        cillum cupidatat sit dolor cillum sit consequat et id aute.
      </Styled.p>
    </Container>
    <Container>
      <Divider sx={{ mb: 4 }} />
    </Container>
    <Container>
      <Flex
        sx={{
          flexDirection: 'row-reverse',
          mb: 4,
        }}
      >
        <Box sx={{ alignSelf: 'flex-start', position: 'sticky', top: 3 }}>
          <Image src={image01} />
        </Box>
        <Box sx={{ minWidth: '40%', maxWidth: '40%', mr: 3 }}>
          <Styled.h2>Step 1</Styled.h2>
          <Styled.p>
            Ex non do dolore occaecat pariatur dolore minim eu laboris voluptate
            mollit incididunt. Eiusmod culpa consectetur esse nostrud minim do
            Lorem sint sint magna mollit elit dolore. Mollit esse id velit irure
            tempor fugiat. Cupidatat sunt nostrud id pariatur magna non anim do
            excepteur id dolor mollit. Pariatur minim cupidatat sint ea aliquip
            nisi incididunt pariatur. Magna do nostrud laborum eiusmod anim id.
          </Styled.p>
          <Styled.p>
            Ut laboris eiusmod laborum qui proident tempor laboris. Incididunt
            ex anim proident ullamco veniam ullamco anim Lorem elit occaecat
            consectetur occaecat ad. Fugiat cupidatat est minim ipsum.
            Incididunt ut cupidatat aliqua velit laboris eu laboris ex aliqua do
            eu culpa. Id quis dolore nostrud quis Lorem minim et eu est.
          </Styled.p>
          <Styled.p>
            Proident ullamco voluptate deserunt pariatur ut aliqua non cillum
            ipsum id nisi esse sunt. Nostrud quis voluptate veniam excepteur.
            Officia officia fugiat cupidatat magna cillum sit anim dolor Lorem
            aliqua elit pariatur irure. Aliquip id occaecat qui quis aute velit
            eu. Incididunt ipsum elit magna ullamco tempor laboris enim dolore
            sunt duis. Laboris commodo aliqua aute magna laboris est labore
            voluptate mollit pariatur fugiat in irure.
          </Styled.p>
        </Box>
      </Flex>
      <Divider sx={{ mb: 4 }} />
      <Flex
        sx={{
          flexDirection: 'row',
          mb: 4,
        }}
      >
        <Box
          sx={{ alignSelf: 'flex-start', position: 'sticky', top: 3, mr: 3 }}
        >
          <Image src={image02} />
        </Box>
        <Box sx={{ minWidth: '40%', maxWidth: '40%' }}>
          <Styled.h2>Step 2</Styled.h2>
          <Styled.p>
            Nulla proident adipisicing sunt veniam amet ipsum esse ut nisi. Do
            consequat nisi non tempor quis proident ullamco commodo adipisicing
            do proident aliquip laboris. Nulla culpa anim enim magna eu qui
            magna. Exercitation qui ipsum esse est fugiat minim anim non et in.
            Esse fugiat in duis eu culpa.
          </Styled.p>
          <Styled.p>
            Nulla duis id sint labore sint sint tempor fugiat dolore eu. Ad
            mollit mollit culpa eu ipsum dolore ea est pariatur. Nulla nisi
            ipsum ut quis reprehenderit labore duis fugiat commodo esse. Ipsum
            id aliqua reprehenderit aliquip reprehenderit et reprehenderit velit
            cupidatat qui sunt deserunt nisi eu.
          </Styled.p>
        </Box>
      </Flex>
      <Divider sx={{ mb: 4 }} />
      <Flex
        sx={{
          flexDirection: 'row-reverse',
          mb: 4,
        }}
      >
        <Box sx={{ alignSelf: 'flex-start', position: 'sticky', top: 3 }}>
          <Image src={image03} />
        </Box>
        <Box sx={{ minWidth: '40%', maxWidth: '40%', mr: 3 }}>
          <Styled.h2>Step 3</Styled.h2>
          <Styled.p>
            Pariatur sint commodo enim et magna nostrud mollit labore ipsum ex
            adipisicing veniam cupidatat minim. Adipisicing nisi irure ea dolor
            tempor eiusmod sint officia esse nisi voluptate est pariatur magna.
            Eu minim non qui labore laboris. Quis officia ipsum consectetur non
            tempor cillum ut do tempor exercitation dolore. Commodo do tempor
            laborum dolor do anim non veniam consectetur.
          </Styled.p>
          <Styled.p>
            Id exercitation cupidatat exercitation consequat anim fugiat.
            Nostrud officia aliqua aute fugiat laborum exercitation elit laboris
            sit est eu excepteur id velit. Ipsum est ea tempor duis aliquip
            aliquip. Dolore cupidatat Lorem ea do dolore Lorem enim fugiat
            ullamco consequat.
          </Styled.p>
          <Styled.p>
            Minim Lorem commodo magna ullamco anim minim laboris velit enim.
            Irure nisi non non do culpa incididunt tempor veniam velit ipsum
            cupidatat non non deserunt. Id exercitation excepteur et do aliquip
            sunt occaecat nostrud eu fugiat. Laboris qui Lorem tempor non ut
            deserunt sit laborum esse eu esse enim aute. Ea laboris amet
            incididunt sit quis pariatur sint dolor dolore eu. Aliquip nulla
            incididunt culpa esse.
          </Styled.p>
        </Box>
      </Flex>
    </Container>
    <Container>
      <Divider sx={{ mb: 4 }} />
    </Container>
    <Container variant="narrow">
      <Styled.h2>Conclusion</Styled.h2>
      <Styled.p>
        Dolore exercitation nostrud pariatur occaecat exercitation veniam
        ullamco magna consectetur deserunt excepteur minim quis. Laboris enim
        fugiat magna labore. Tempor id in et do. Amet do in irure commodo nulla
        magna sit mollit sunt anim fugiat nulla dolor. Laborum commodo et ut
        eiusmod consequat est sint excepteur in.
      </Styled.p>
    </Container>
  </Layout>
);

Article.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
};

export default Article;
