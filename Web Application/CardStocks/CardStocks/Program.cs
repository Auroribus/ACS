using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Data.SqlClient;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

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
            //.UseUrls("http://Cardstocks.net:58094")
            .Build();
    }
  }
    

