IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20171108092357_CSContextMigration')
BEGIN
    CREATE TABLE [Collections] (
        [CollectionID] int NOT NULL IDENTITY,
        CONSTRAINT [PK_Collections] PRIMARY KEY ([CollectionID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20171108092357_CSContextMigration')
BEGIN
    CREATE TABLE [Cards] (
        [CardID] int NOT NULL IDENTITY,
        [CardName] nvarchar(max) NULL,
        [CardRarity] nvarchar(max) NULL,
        [CardSet] nvarchar(max) NULL,
        [CollectionID] int NULL,
        CONSTRAINT [PK_Cards] PRIMARY KEY ([CardID]),
        CONSTRAINT [FK_Cards_Collections_CollectionID] FOREIGN KEY ([CollectionID]) REFERENCES [Collections] ([CollectionID]) ON DELETE NO ACTION
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20171108092357_CSContextMigration')
BEGIN
    CREATE INDEX [IX_Cards_CollectionID] ON [Cards] ([CollectionID]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20171108092357_CSContextMigration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20171108092357_CSContextMigration', N'2.0.0-rtm-26452');
END;

GO

