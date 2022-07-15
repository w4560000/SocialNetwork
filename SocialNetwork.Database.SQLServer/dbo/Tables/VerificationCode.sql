CREATE TABLE [dbo].[VerificationCode] (
    [Key]              INT            IDENTITY (1, 1) NOT NULL,
    [Mail]             NVARCHAR (100) NOT NULL,
    [VCode]            CHAR (10)      NOT NULL,
    [Status]           INT            NOT NULL,
    [VerificationDate] DATETIME       NULL,
    [CreatedAt]  DATETIME      NoT NULL,
    [CreatedBy]  INT NOT NULL,
    [UpdatedAt]  DATETIME      NULL,
    [UpdatedBy]  INT NULL,
    CONSTRAINT [PK_VerificationCode] PRIMARY KEY CLUSTERED ([Key] ASC)
);


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'主Key', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VerificationCode', @level2type = N'COLUMN', @level2name = N'Key';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'信箱', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VerificationCode', @level2type = N'COLUMN', @level2name = N'Mail';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗證碼', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VerificationCode', @level2type = N'COLUMN', @level2name = N'VCode';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗證狀態 (0=尚未驗證, 1=已驗證)', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VerificationCode', @level2type = N'COLUMN', @level2name = N'Status';
GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'驗證日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'VerificationCode', @level2type = N'COLUMN', @level2name = N'VerificationDate';
GO


EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'VerificationCode',
    @level2type = N'COLUMN',
    @level2name = N'CreatedAt';
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'建立人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'VerificationCode',
    @level2type = N'COLUMN',
    @level2name = N'CreatedBy'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改日期',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'VerificationCode',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedAt'
GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'修改人員',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'VerificationCode',
    @level2type = N'COLUMN',
    @level2name = N'UpdatedBy'


