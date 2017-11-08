using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Data.SqlClient;
using System.Text;

namespace CardStocks
{
  public class Program
  {

    public static void Main(string[] args)
    {
      BuildWebHost(args).Run();
    }

    public static IWebHost BuildWebHost(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>()
            .Build();
    }

    /*
    try
    {
      SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
      builder.DataSource = "cardstocks-ap.database.windows.net";
      builder.UserID = "steven";
      builder.Password = "Testing!1";
      builder.InitialCatalog = "CardStocksDB";

      using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
      {
        Console.WriteLine("\nQuery data example:");
        Console.WriteLine("=========================================\n");

        connection.Open();
        StringBuilder sb = new StringBuilder();
        sb.Append("SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName ");
        sb.Append("FROM [SalesLT].[ProductCategory] pc ");
        sb.Append("JOIN [SalesLT].[Product] p ");
        sb.Append("ON pc.productcategoryid = p.productcategoryid;");
        String sql = sb.ToString();

        using (SqlCommand command = new SqlCommand(sql, connection))
        {
          using (SqlDataReader reader = command.ExecuteReader())
          {
            while (reader.Read())
            {
              Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
            }
          }
        }
      }
    }
    catch (SqlException e)
    {
      Console.WriteLine(e.ToString());
    }
    Console.ReadLine();*/
  

  }
    

