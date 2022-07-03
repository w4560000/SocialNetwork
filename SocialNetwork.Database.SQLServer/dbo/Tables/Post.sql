CREATE TABLE [dbo].[Post] (
    [PostNumber]   INT            IDENTITY (1, 1) NOT NULL,
    [MeberID]      INT            NOT NULL,
    [PostContent]  NVARCHAR (MAX) NOT NULL,
    [PostImage]    NVARCHAR (MAX) NOT NULL,
    [GoodQuantity] INT            NOT NULL,
    [Status]       INT            NOT NULL,
    [CreateDate]   DATETIME       NOT NULL,
    CONSTRAINT [PK_Post] PRIMARY KEY CLUSTERED ([PostNumber] ASC)
);

