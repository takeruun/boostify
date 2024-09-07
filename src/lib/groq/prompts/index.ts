export type EvaluationTextPromptFormatProps = {
  postContent: string;
  imageDescription: string;
  replyCount: number;
  likeCount: number;
};
export const evaluationTextPromptFormat = ({
  postContent,
  imageDescription,
  replyCount,
  likeCount,
}: EvaluationTextPromptFormatProps) => `
Post content:
${postContent}

Image:
${imageDescription}

Replies: ${replyCount}
Likes: ${likeCount}
`;
