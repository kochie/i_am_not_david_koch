import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from "react-tweet";
import { ConversationTweetAncestor } from "./ConversationTweetAncestor";

type ConversationTweetProps = {
  id: string;
};

export function ConversationTweet({ id }: ConversationTweetProps) {
  const reply = useTweet(id);
  const parentId = reply.data?.in_reply_to_status_id_str;
  const parent = useTweet(parentId);

  if (reply.isLoading || (parentId && parent.isLoading)) {
    return <TweetSkeleton />;
  }

  if (reply.error || !reply.data) {
    return <TweetNotFound error={reply.error} />;
  }

  if (parentId && (parent.error || !parent.data)) {
    return <TweetNotFound error={parent.error} />;
  }

  return (
    <div className="conversation-tweet">
      {parent.data ? <ConversationTweetAncestor tweet={parent.data} /> : null}
      <EmbeddedTweet tweet={reply.data} />
    </div>
  );
}