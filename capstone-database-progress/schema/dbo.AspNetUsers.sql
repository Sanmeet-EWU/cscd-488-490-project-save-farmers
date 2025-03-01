USE [FarmerAPI]
GO

/****** Object: Table [dbo].[AspNetUsers] Script Date: 2/11/2025 1:48:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AspNetUsers] (
    [Id]                     NVARCHAR (450)     NOT NULL,
    [FirstName]              NVARCHAR (MAX)     NOT NULL,
    [LastName]               NVARCHAR (MAX)     NOT NULL,
    [Role]                   NVARCHAR (MAX)     NOT NULL,
    [RefreshToken]           NVARCHAR (MAX)     NULL,
    [RefreshTokenExpiryTime] DATETIME2 (7)      NULL,
    [CreateAt]               DATETIME2 (7)      NOT NULL,
    [UpdateAt]               DATETIME2 (7)      NOT NULL,
    [UserName]               NVARCHAR (256)     NULL,
    [NormalizedUserName]     NVARCHAR (256)     NULL,
    [Email]                  NVARCHAR (256)     NULL,
    [NormalizedEmail]        NVARCHAR (256)     NULL,
    [EmailConfirmed]         BIT                NOT NULL,
    [PasswordHash]           NVARCHAR (MAX)     NULL,
    [SecurityStamp]          NVARCHAR (MAX)     NULL,
    [ConcurrencyStamp]       NVARCHAR (MAX)     NULL,
    [PhoneNumber]            NVARCHAR (MAX)     NULL,
    [PhoneNumberConfirmed]   BIT                NOT NULL,
    [TwoFactorEnabled]       BIT                NOT NULL,
    [LockoutEnd]             DATETIMEOFFSET (7) NULL,
    [LockoutEnabled]         BIT                NOT NULL,
    [AccessFailedCount]      INT                NOT NULL
);


GO
CREATE NONCLUSTERED INDEX [EmailIndex]
    ON [dbo].[AspNetUsers]([NormalizedEmail] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex]
    ON [dbo].[AspNetUsers]([NormalizedUserName] ASC) WHERE ([NormalizedUserName] IS NOT NULL);


GO
ALTER TABLE [dbo].[AspNetUsers]
    ADD CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC);


