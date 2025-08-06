

//using MyStockApp.Services;

//var builder = WebApplication.CreateBuilder(args);


//// Add services to the container.

//builder.Services.AddHttpClient<StockService>();
//builder.Services.AddControllers();

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseHttpsRedirection();

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using MyStockApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddHttpClient<StockService>();
builder.Services.AddControllers();

// הוספת תמיכה ב־CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()    // מאפשר מכל מקור (למשל, localhost)
               .AllowAnyMethod()    // מאפשר כל שיטה (GET, POST, PUT וכו')
               .AllowAnyHeader());  // מאפשר כל כותרת
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// הוספת תמיכה ב־CORS לפני כל שאר הקונפיגורציות
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
