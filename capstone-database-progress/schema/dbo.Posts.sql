USE [FarmerAPI]
GO

/****** Object: Table [dbo].[Posts] Script Date: 2/11/2025 1:48:32 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Posts] (
    [PostId]      UNIQUEIDENTIFIER NOT NULL,
    [Title]       NVARCHAR (MAX)   NOT NULL,
    [Price]       NVARCHAR (MAX)   NOT NULL,
    [CropType]    NVARCHAR (MAX)   NOT NULL,
    [Amount]      NVARCHAR (MAX)   NOT NULL,
    [Location]    NVARCHAR (MAX)   NOT NULL,
    [Contact]     NVARCHAR (MAX)   NOT NULL,
    [Description] NVARCHAR (MAX)   NULL,
    [CreateDate]  DATETIME2 (7)    NOT NULL,
    [UpdateDate]  DATETIME2 (7)    NOT NULL,
    [ExpireDate]  DATETIME2 (7)    NOT NULL,
    [Name]        NVARCHAR (MAX)   NOT NULL,
    [UserId]      UNIQUEIDENTIFIER NOT NULL
);


