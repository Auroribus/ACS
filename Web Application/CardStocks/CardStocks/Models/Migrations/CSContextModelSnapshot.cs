﻿// <auto-generated />
using CardStocks.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace CardStocks.Models.Migrations
{
    [DbContext(typeof(CSContext))]
    partial class CSContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CardStocks.Models.Card", b =>
                {
                    b.Property<int>("CardID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CardName");

                    b.Property<string>("CardRarity");

                    b.Property<string>("CardSet");

                    b.Property<int?>("CollectionID");

                    b.HasKey("CardID");

                    b.HasIndex("CollectionID");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("CardStocks.Models.Collection", b =>
                {
                    b.Property<int>("CollectionID")
                        .ValueGeneratedOnAdd();

                    b.HasKey("CollectionID");

                    b.ToTable("Collections");
                });

            modelBuilder.Entity("CardStocks.Models.Card", b =>
                {
                    b.HasOne("CardStocks.Models.Collection")
                        .WithMany("CardsInCollection")
                        .HasForeignKey("CollectionID");
                });
#pragma warning restore 612, 618
        }
    }
}
