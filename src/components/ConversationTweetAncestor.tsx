import { TweetBody, TweetMedia, enrichTweet, formatDate } from "react-tweet";
import type { Tweet } from "react-tweet/api";

type ConversationTweetAncestorProps = {
  tweet: Tweet;
};

export function ConversationTweetAncestor({
  tweet: t,
}: ConversationTweetAncestorProps) {
  const tweet = enrichTweet(t);
  const { user } = tweet;

  return (
    <div className="conversation-tweet-ancestor">
      <a
        href={tweet.url}
        className="conversation-tweet-ancestor__avatar"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={user.profile_image_url_https} alt={user.name} />
      </a>
      <div className="conversation-tweet-ancestor__body">
        <div className="conversation-tweet-ancestor__header">
          <a
            href={tweet.url}
            className="conversation-tweet-ancestor__name"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.name}
          </a>
          <a
            href={tweet.url}
            className="conversation-tweet-ancestor__username"
            target="_blank"
            rel="noopener noreferrer"
          >
            @{user.screen_name}
          </a>
          <span className="conversation-tweet-ancestor__separator">·</span>
          <a
            href={tweet.url}
            className="conversation-tweet-ancestor__date"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formatDate(new Date(tweet.created_at)).split(" · ")[1]}
          </a>
        </div>
        <TweetBody tweet={tweet} />
        {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} /> : null}
      </div>
    </div>
  );
}
