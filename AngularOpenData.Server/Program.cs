using AngularOpenData.Server.Controllers;
using AngularOpenData.Server.Services;

var builder = WebApplication.CreateBuilder(args);
//----------add test start----------
//HttpClient �O Scoped / Transient
//���U WeatherService�A�èϥ� AddHttpClient ���� HttpClient�]�䴩 DI�^
builder.Services.AddHttpClient<AngularOpenData.Server.Services.WeatherService>()
    .ConfigurePrimaryHttpMessageHandler(() =>
        new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        });
// ���U���
builder.Services.AddControllers();
//----------add test end----------
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// �إ� app ����
var app = builder.Build();

// �� Angular �e�ݯ��Ū���R�A�ɮס]index.html�Bjs�Bcss�^
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
// �}�o������� Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// �ϥ� HTTPS �P���v�]���v�o�̨S�t�m��ھ���^
app.UseHttpsRedirection();
app.UseAuthorization();

// �]�w���ѹ������
app.MapControllers();

// �p�G�䤣�� API ���ѡA�N�^�� Angular �� index.html
app.MapFallbackToFile("/index.html");
// �Ұ�����
app.Run();