CREATE TABLE [dbo].[FriendList] (
    [MemberID]   INT      NOT NULL,
    [FriendID]   INT      NOT NULL,
    [CreatedAt]  DATETIME      NoT NULL,
    [CreatedBy]  INT NOT NULL,
    [UpdatedAt]  DATETIME      NULL,
    [UpdatedBy]  INT NULL,
    CONSTRAINT [PK_FriendList] PRIMARY KEY CLUSTERED ([MemberID] ASC, [FriendID] ASC)
);
GO

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendList',
    @level2type = N'COLUMN',
    @level2name = N'CreatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendList',
    @level2type = N'COLUMN',
    @level2name = N'CreatedBy'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendList',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendList',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedBy'
