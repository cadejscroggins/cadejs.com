import React from "react";
import SectionGithub from "../components/SectionGithub";
import SectionSoundcloud from "../components/SectionSoundcloud";
import SectionTwitter from "../components/SectionTwitter";
import SectionUnsplash from "../components/SectionUnsplash";

const HomePage = ({ data }) => (
  <div>
    <SectionGithub
      repos={data.githubViewer.pinnedRepositories.edges}
      reposCount={data.githubViewer.repositories.totalCount}
    />
    <SectionSoundcloud
      favorites={data.allSoundcloudtrack.edges}
      favoritesCount={data.soundclouduser.public_favorites_count}
    />
    <SectionTwitter
      tweets={data.allTweet.edges}
      tweetsCount={data.tweet.user.statuses_count}
    />
    <SectionUnsplash
      photos={data.allUnsplashPhoto.edges}
      photosCount={data.unsplashPhoto.user.total_photos}
    />
  </div>
);

export default HomePage;

export const query = graphql`
  query PageQuery {
    allTweet(sort: { fields: [created_at], order: ASC }) {
      edges {
        node {
          created_at
          id_str
          in_reply_to_status_id_str
          text
          entities {
            hashtags {
              text
            }
            user_mentions {
              screen_name
            }
            urls {
              display_url
              expanded_url
              indices
              url
            }
          }
        }
      }
    }
    tweet {
      user {
        statuses_count
      }
    }
    allUnsplashPhoto(limit: 4, sort: { fields: [created_at], order: DESC }) {
      edges {
        node {
          urls {
            full
            regular
            small
          }
          created_at
        }
      }
    }
    unsplashPhoto {
      user {
        total_photos
      }
    }
    githubViewer {
      pinnedRepositories {
        edges {
          node {
            description
            homepageUrl
            name
            url
          }
        }
      }
      repositories {
        totalCount
      }
    }
    allSoundcloudtrack(limit: 2) {
      edges {
        node {
          title
          stream_url
          artwork_url
          user {
            username
          }
        }
      }
    }
    soundclouduser {
      public_favorites_count
    }
  }
`;
