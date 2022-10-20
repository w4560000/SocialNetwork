USE SocialNetwork;

-- Post
ALTER TABLE [dbo].[Post]  
WITH CHECK ADD CONSTRAINT [FK_Post_MemberID] FOREIGN KEY([MemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

-- PostMsg
ALTER TABLE [dbo].[PostMsg]  
WITH CHECK ADD CONSTRAINT [FK_PostMsg_MemberID] FOREIGN KEY([MemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

ALTER TABLE [dbo].[PostMsg]  
WITH CHECK ADD CONSTRAINT [FK_PostMsg_PostKey] FOREIGN KEY([PostKey])
REFERENCES [dbo].[Post] ([PostKey])
ON UPDATE No Action
ON DELETE No Action
GO

-- ForgotPassword
ALTER TABLE [dbo].[ForgotPassword]  
WITH CHECK ADD CONSTRAINT [FK_ForgotPassword_MemberID] FOREIGN KEY([MemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

-- Friend
ALTER TABLE [dbo].[Friend]  
WITH CHECK ADD CONSTRAINT [FK_Friend_MemberID] FOREIGN KEY([MemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

ALTER TABLE [dbo].[Friend]  
WITH CHECK ADD CONSTRAINT [FK_Friend_FriendMemberID] FOREIGN KEY([FriendMemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

-- FriendInvitation
ALTER TABLE [dbo].[FriendInvitation]  
WITH CHECK ADD CONSTRAINT [FK_FriendInvitation_SendMemberID] FOREIGN KEY([SendMemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO

ALTER TABLE [dbo].[FriendInvitation]  
WITH CHECK ADD CONSTRAINT [FK_FriendInvitation_ReceiveMemberID] FOREIGN KEY([ReceiveMemberID])
REFERENCES [dbo].[Member] ([MemberID])
ON UPDATE No Action
ON DELETE No Action
GO