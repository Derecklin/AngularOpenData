using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace AngularOpenData.Server.Services
{
    public class WeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public WeatherService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        #region Limit Taipai
        public async Task<string> GetWeatherAsync()
        {
            var apiKey = _configuration["CWA:ApiKey"];
            var url = $"https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization={apiKey}&locationName=臺北市";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"opendata.cwa.gov.tw API failed: {response.StatusCode}");
            }
            return await response.Content.ReadAsStringAsync();
        }
        #endregion
        #region no limit search
        public async Task<string> GetWeatherByCityAsync(string locationName)
        {
            var apiKey = _configuration["CWA:ApiKey"];
            var url = $"https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization={apiKey}&locationName={locationName}";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException($"opendata.cwa.gov.tw API failed: {response.StatusCode}");
            }
            return await response.Content.ReadAsStringAsync();
        }
        #endregion
    }
}
