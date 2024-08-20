import {
  Entry_TimelineTimelineItem,
  Entry_TimelineTimelineItem_ItemContent,
  Entry_TimelineTimelineModule,
  Instruction_TweetDetail,
} from './tweet';

export const isInstruction_TimelineAddEntries = (
  content: Instruction_TweetDetail,
) => {
  return content.type === 'TimelineAddEntries';
};

export const isEntry_TimelineTimelineItem = (
  content: Entry_TimelineTimelineItem | Entry_TimelineTimelineModule,
) => {
  return 'content' in content;
};

export const isEntry_TimelineTimelineModule = (
  content: Entry_TimelineTimelineItem | Entry_TimelineTimelineModule,
) => {
  return (
    'displayType' in content && content.displayType === 'VerticalConversation'
  );
};

export const isItemContent_TimelineTweet = (
  content: Entry_TimelineTimelineItem_ItemContent,
) => {
  return content.itemType === 'TimelineTweet';
};
