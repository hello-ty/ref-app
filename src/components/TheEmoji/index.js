import { Emoji } from "emoji-mart";

export function TheEmoji(props) {
  return <Emoji emoji={props.emoji} size={props.size} set="apple" />;
}
