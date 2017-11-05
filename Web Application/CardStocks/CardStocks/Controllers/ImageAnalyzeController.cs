using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CardStocks.Controllers
{
    [Produces("application/json")]
    [Route("api/ImageAnalyze")]
    public class ImageAnalyzeController : Controller
    {
        // POST: api/ImageAnalyze
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
    }
}
