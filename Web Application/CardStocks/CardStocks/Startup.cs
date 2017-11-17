using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using CardStocks.Models;
using Microsoft.AspNetCore.Session;



namespace CardStocks
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
          
          Configuration = configuration;
        }
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
      services.AddMvc();//.AddSessionStateTempDataProvider();

          //  services.AddDistributedMemoryCache();
          //  services.AddSession(options =>
          //  {
          //    options.Cookie.Name = ".CardStocks.Session";
          //    options.IdleTimeout = TimeSpan.FromSeconds(10);              
          //  });
     
            services.AddDbContext<CSContext>(options =>
                    options.UseSqlServer(Configuration.GetConnectionString("CardStocksContext")));
        }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, CSContext CScontext)
        {
            //app.UseSession();

            app.Use(async (context, next) => {
                await next();
                if (context.Response.StatusCode == 404 &&
                   !Path.HasExtension(context.Request.Path.Value) &&
                   !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            DBInitializer.Initialize(CScontext);

            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();
        }
    }
}
