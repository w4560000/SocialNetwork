CREATE TABLE [dbo].[Member] (
    [MemberID]   INT            IDENTITY (1, 1) NOT NULL,
    [Account]    NVARCHAR (100)  NOT NULL,
    [NickName]   NVARCHAR (100) NOT NULL,
    [Password]   NVARCHAR (500) NOT NULL,
    [Mail]       NVARCHAR (100) NOT NULL,
    [ProfilePhotoURL] NVARCHAR(500) NOT NULL,
    [BackgoundPhotoURL] NVARCHAR(500) NOT NULL,
    [Birthday]   DATE           NULL,
    [Interest]   NVARCHAR (300) NULL,
    [Job]        NVARCHAR (300) NULL,
    [Education]  NVARCHAR (20)  NULL,
    [InfoStatus] INT            NOT NULL,
    [Status]     INT            NOT NULL,
    [CreatedAt]  DATETIME       NOT NULL,
    [CreatedBy]  INT            NOT NULL,
    [UpdatedAt]  DATETIME       NOT NULL,
    [UpdatedBy]  INT            NOT NULL,
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
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'大頭貼路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'ProfilePhotoURL';

GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'背景圖路徑', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'BackgoundPhotoURL';

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
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'CreatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'CreatedBy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'UpdatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'Member', @level2type = N'COLUMN', @level2name = N'UpdatedBy';

