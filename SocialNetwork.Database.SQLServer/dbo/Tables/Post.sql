CREATE TABLE [dbo].[Post] (
    [PostKey]   INT            IDENTITY (1, 1) NOT NULL,
    [MemberID]      INT            NOT NULL,
    [PostContent]  NVARCHAR (MAX) NOT NULL,
    [PostImageUrl]    NVARCHAR (MAX) NOT NULL,
    [GoodQuantity] INT            NOT NULL ,
    [Status]       INT            NOT NULL,
    [CreatedAt]    DATETIME       NOT NULL,
    [CreatedBy]    INT            NOT NULL,
    [UpdatedAt]    DATETIME       NOT NULL,
    [UpdatedBy]    INT            NOT NULL,
    CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([PostKey] ASC)
);




GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Post', @level2type = N'COLUMN', @level2name = N'CreatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Post', @level2type = N'COLUMN', @level2name = N'CreatedBy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Post', @level2type = N'COLUMN', @level2name = N'UpdatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Post', @level2type = N'COLUMN', @level2name = N'UpdatedBy';


GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'貼文序號',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'PostKey'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'會員編號',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'MemberID'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'貼文內容',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'PostContent'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'圖片路徑 (以,區隔)',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = 'PostImageUrl'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'按讚數',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'GoodQuantity'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'貼文狀態 (1 = 正常, 0 = 已刪除)',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'Status'