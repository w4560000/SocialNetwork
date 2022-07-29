CREATE TABLE [dbo].[ForgotPassword]
(
	[Key]					INT				IDENTITY (1, 1) NOT NULL, 
    [Guid]		            NVARCHAR(200)	NOT NULL,
	[MemberID]				INT				NOT NULL,
	[CreatedAt]             DATETIME       NOT NULL,
    [CreatedBy]             INT            NOT NULL,
    [UpdatedAt]             DATETIME       NOT NULL,
    [UpdatedBy]             INT            NOT NULL,
    CONSTRAINT [PK_ForgotPassword] PRIMARY KEY CLUSTERED ([Key] ASC)
)

GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'PK', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'Key';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'GUID', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = 'Guid';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'會員編號', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'MemberID';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'CreatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'建立人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'CreatedBy';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改日期', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'UpdatedAt';


GO
EXECUTE sp_addextendedproperty @name = N'MS_Description', @value = N'修改人員', @level0type = N'SCHEMA', @level0name = N'dbo', @level1type = N'TABLE', @level1name = N'ForgotPassword', @level2type = N'COLUMN', @level2name = N'UpdatedBy';
