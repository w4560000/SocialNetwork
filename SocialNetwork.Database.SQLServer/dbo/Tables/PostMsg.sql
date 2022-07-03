CREATE TABLE [dbo].[PostMsg] (
    [MsgNumber]  INT            IDENTITY (1, 1) NOT NULL,
    [PostNumber] INT            NOT NULL,
    [MemberID]   INT            NOT NULL,
    [MsgContent] NVARCHAR (MAX) NOT NULL,
    [MsgImage]   NVARCHAR (MAX) NOT NULL,
    [CreateDate] DATETIME       NOT NULL,
    CONSTRAINT [PK_PostMsg] PRIMARY KEY CLUSTERED ([MsgNumber] ASC)
);

