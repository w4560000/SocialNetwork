CREATE TABLE [dbo].[Friend] (
    [MemberID]  INT      NOT NULL,
    [FriendMemberID]  INT      NOT NULL,
    [CreatedAt] DATETIME NOT NULL,
    [CreatedBy] INT      NOT NULL,
    [UpdatedAt] DATETIME NOT NULL,
    [UpdatedBy] INT      NOT NULL,
    CONSTRAINT [PK_Friend] PRIMARY KEY CLUSTERED ([MemberID] ASC, [FriendMemberID] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Friend', @level2type = N'COLUMN', @level2name = N'CreatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Friend', @level2type = N'COLUMN', @level2name = N'CreatedBy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Friend', @level2type = N'COLUMN', @level2name = N'UpdatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Friend', @level2type = N'COLUMN', @level2name = N'UpdatedBy';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'會員編號',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Friend',
    @level2type = N'COLUMN',
    @level2name = N'MemberID'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'關聯好友的會員編號',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Friend',
    @level2type = N'COLUMN',
    @level2name = N'FriendMemberID'