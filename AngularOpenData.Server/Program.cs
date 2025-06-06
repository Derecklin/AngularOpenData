using AngularOpenData.Server.Controllers;
using AngularOpenData.Server.Services;

var builder = WebApplication.CreateBuilder(args);
//----------add test start----------
//HttpClient 是 Scoped / Transient
//註冊 WeatherService，並使用 AddHttpClient 提供 HttpClient（支援 DI）
builder.Services.AddHttpClient<AngularOpenData.Server.Services.WeatherService>()
    .ConfigurePrimaryHttpMessageHandler(() =>
        new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        });
// 註冊控制器
builder.Services.AddControllers();
//----------add test end----------
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// 建立 app 實體
var app = builder.Build();

// 讓 Angular 前端能夠讀取靜態檔案（index.html、js、css）
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
// 開發環境顯示 Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// 使用 HTTPS 與授權（授權這裡沒配置實際機制）
app.UseHttpsRedirection();
app.UseAuthorization();

// 設定路由對應控制器
app.MapControllers();

// 如果找不到 API 路由，就回傳 Angular 的 index.html
app.MapFallbackToFile("/index.html");
// 啟動應用
app.Run();