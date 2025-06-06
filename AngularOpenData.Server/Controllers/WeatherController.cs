using AngularOpenData.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace AngularOpenData.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly WeatherService _weatherService;

        public WeatherController(WeatherService weatherService)
        {
            _weatherService = weatherService;
        }
        [HttpGet]
#if false
        #region Limit Taipai
        public async Task<IActionResult> Get()
        {
            try
            {
                var json = await _weatherService.GetWeatherAsync();
                return Content(json, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message}");
            }
        }
        #endregion
#else
        #region no limit search
        public async Task<IActionResult> Get([FromQuery] string locationName = "»O¥_¥«")
        {
            try
            {
                var json = await _weatherService.GetWeatherByCityAsync(locationName);
                return Content(json, "application/json");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Server Error: {ex.Message}");
            }
        }
        #endregion
#endif
    }
}
