CREATE TABLE [dbo].[FriendInvitation]
(
	[Key] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SendMemberID] INT NOT NULL, 
    [ReceiveMemberID] INT NOT NULL,
    [CreatedAt] DATETIME NOT NULL,
    [CreatedBy] INT      NOT NULL,
    [UpdatedAt] DATETIME NOT NULL,
    [UpdatedBy] INT      NOT NULL, 
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'CreatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'CreatedBy'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedBy'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'PK',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'Key'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'傳送方',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'SendMemberID'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'接收方',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'FriendInvitation',
    @level2type = N'COLUMN',
    @level2name = N'ReceiveMemberID'
GO
