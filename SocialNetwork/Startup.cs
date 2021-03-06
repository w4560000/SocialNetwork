using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SocialNetwork.Helper;
using SocialNetwork.Repository;
using SocialNetwork.Repository.Base;
using SocialNetwork.Service;
using System;
using System.IO;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork
{
    /// <summary>
    /// Startup
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Construct
        /// </summary>
        /// <param name="configuration">IConfiguration</param>
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// IConfiguration
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services">IServiceCollection</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Implement Swagger UI",
                    Description = "A simple example to Implement Swagger UI",
                });

                // 匯入 註解XML 至 Swagger
                foreach (var fi in new DirectoryInfo(Path.Combine(AppContext.BaseDirectory)).EnumerateFiles("*.xml"))
                    c.IncludeXmlComments(fi.FullName);
            });

            services.Configure<AppSettings>(Configuration);

            // DI註冊 Repository
            services.AddScoped<IPostgreSqlConnectionFactory, PostgreSqlConnectionFactoryBase>();
            services.AddScoped<ISQLServerConnectionFactory, SQLServerConnectionFactoryBase>();
            services.AddScoped<ITestPostgreSQLRepository, TestPostgreSQLRepository>();
            services.AddScoped<IMemberRepository, MemberRepository>();
            services.AddScoped<IVerificationCodeRepository, VerificationCodeRepository>();
            services.AddScoped<IForgotPasswordRepository, ForgotPasswordRepository>();

            // DI註冊 Service
            services.AddScoped<IMemberService, MemberService>();
            services.AddScoped<ITestService, TestService>();

            services.AddSingleton<IUserContext, UserContext>();
            services.AddSingleton(provider => Configuration);
            services.AddSingleton<IConfigHelper, ConfigHelper>();
            services.AddSingleton<ICacheHelper, RedisCacheHelper>();
            services.AddSingleton<JwtHelper>();
            services.AddSingleton<HttpClientHelper>();

            // 驗證 JWT
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.Cookie.SameSite = SameSiteMode.Strict;
                        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                        options.Cookie.IsEssential = true;
                    })
                    .AddJwtBearer(options =>
                    {
                        // 當驗證失敗時，回應標頭會包含 WWW-Authenticate 標頭，這裡會顯示失敗的詳細錯誤原因
                        options.IncludeErrorDetails = true; // 預設值為 true，有時會特別關閉
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // 透過這項宣告，就可以從 "sub" 取值並設定給 User.Identity.Name
                            NameClaimType = ClaimTypes.NameIdentifier,
                            // 透過這項宣告，就可以從 "roles" 取值，並可讓 [Authorize] 判斷角色
                            RoleClaimType = ClaimTypes.Role,

                            // 一般我們都會驗證 Issuer
                            ValidateIssuer = true,
                            ValidIssuer = Configuration.GetValue<string>("JwtSettings:Issuer"),

                            // 通常不太需要驗證 Audience
                            ValidateAudience = false,
                            //ValidAudience = "JwtAuthDemo", // 不驗證就不需要填寫

                            // 一般我們都會驗證 Token 的有效期間
                            ValidateLifetime = true,

                            // 如果 Token 中包含 key 才需要驗證，一般都只有簽章而已
                            ValidateIssuerSigningKey = false,

                            // "1234567890123456" 應該從 IConfiguration 取得
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("JwtSettings:SignKey")))
                        };

                        options.Events = new JwtBearerEvents
                        {
                            OnMessageReceived = context =>
                            {
                                if (context.Request.Cookies.ContainsKey("X-Access-Token"))
                                    context.Token = context.Request.Cookies["X-Access-Token"];

                                return Task.CompletedTask;
                            }
                        };
                    });

            services.AddMvc(options =>
            {
                // Global ActionFilter
                options.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build()));
                options.Filters.Add(new ValidateModelAttribute());
            }).AddJsonOptions(options =>
            {
                // Json 輸出 預設是 Camel，改為 Null (PascalCase)
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            }).ConfigureApiBehaviorOptions(options =>
            {
                // 關閉驗證失敗時自動 HTTP 400 回應
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddHttpContextAccessor();
            services.AddControllersWithViews();
            services.AddHttpClient();
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">IApplicationBuilder</param>
        /// <param name="env">IWebHostEnvironment</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseStatusCodePages(context =>
            {
                var request = context.HttpContext.Request;
                var response = context.HttpContext.Response;

                if (response.StatusCode == (int)HttpStatusCode.Unauthorized)
                    response.Redirect("/Member/Login");

                return Task.CompletedTask;
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Showing API V1");
            });
        }
    }
}