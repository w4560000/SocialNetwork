CREATE TABLE [dbo].[FriendList] (
    [MemberID]   INT      NOT NULL,
    [FriendID]   INT      NOT NULL,
    [CreateDate] DATETIME NOT NULL,
    CONSTRAINT [PK_FriendList] PRIMARY KEY CLUSTERED ([MemberID] ASC, [FriendID] ASC)
);

