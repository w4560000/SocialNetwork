CREATE TABLE [dbo].[Member] (
    [MemberID]   INT            IDENTITY (1, 1) NOT NULL,
    [Account]    NVARCHAR (20)  NOT NULL,
    [NickName]   NVARCHAR (100) NOT NULL,
    [Password]   NVARCHAR (500) NOT NULL,
    [Mail]       NVARCHAR (100) NOT NULL,
    [Birthday]   DATE           NULL,
    [Interest]   NVARCHAR (300) NULL,
    [Job]        NVARCHAR (300) NULL,
    [Education]  NVARCHAR (20)  NULL,
    [InfoStatus] INT            NOT NULL,
    [Status]     INT            NOT NULL,
    [CreateDate] DATETIME       NOT NULL,
    CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED ([MemberID] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'MemberID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'帳號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Account';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'暱稱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'NickName';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'密碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Password';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Mail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'生日', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Birthday';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'興趣', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Interest';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'工作', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Job';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'學歷', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Education';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'資訊狀態Flag (1=生日、2=興趣、4=工作、8=學歷)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'InfoStatus';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員狀態 Flag (1=在線, 2=忙碌, 3=離線)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'Status';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'創帳日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'CreateDate';

