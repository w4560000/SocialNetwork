CREATE TABLE [dbo].[Post] (
    [PostNumber]   INT            IDENTITY (1, 1) NOT NULL,
    [MeberID]      INT            NOT NULL,
    [PostContent]  NVARCHAR (MAX) NOT NULL,
    [PostImage]    NVARCHAR (MAX) NOT NULL,
    [GoodQuantity] INT            NOT NULL,
    [Status]       INT            NOT NULL,
    [CreatedAt]    DATETIME            NoT NULL,
    [CreatedBy]    INT       NOT NULL,
    [UpdatedAt]    DATETIME      NULL,
    [UpdatedBy]    INT NULL,
    CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([PostNumber] ASC)
);
GO

EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'CreatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'CreatedBy'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Post',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedBy'
