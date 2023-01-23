using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
using StackExchange.Redis;
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

                // �פJ ����XML �� Swagger
                foreach (var fi in new DirectoryInfo(Path.Combine(AppContext.BaseDirectory)).EnumerateFiles("*.xml"))
                    c.IncludeXmlComments(fi.FullName);
            });

            services.Configure<AppSettings>(Configuration);

            // DI���U Repository
            services.AddScoped<IPostgreSqlConnectionFactory, PostgreSqlConnectionFactoryBase>();
            services.AddScoped<ISQLServerConnectionFactory, SQLServerConnectionFactoryBase>();
            services.AddScoped<ITestPostgreSQLRepository, TestPostgreSQLRepository>();
            services.AddScoped<IMemberRepository, MemberRepository>();
            services.AddScoped<IVerificationCodeRepository, VerificationCodeRepository>();
            services.AddScoped<IForgotPasswordRepository, ForgotPasswordRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostMsgRepository, PostMsgRepository>();
            services.AddScoped<IFriendRepository, FriendRepository>();
            services.AddScoped<IFriendInvitationRepository, FriendInvitationRepository>();

            // DI���U Service
            services.AddScoped<ITestService, TestService>();
            services.AddScoped<IMemberService, MemberService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IFriendService, FriendService>();


            var connectionMultiplexer = ConnectionMultiplexer.Connect(new ConfigurationOptions()
            {
                EndPoints = { Configuration.GetValue<string>("RedisSettings:Connection") },
                Password = Configuration.GetValue<string>("RedisSettings:Password"),
                AbortOnConnectFail = false
            });

            services.AddSingleton<IConnectionMultiplexer>(connectionMultiplexer);
            services.AddSingleton<IUserContext, UserContext>();
            services.AddSingleton(provider => Configuration);
            services.AddSingleton<IConfigHelper, ConfigHelper>();
            services.AddSingleton<ICacheHelper, RedisCacheHelper>();
            services.AddSingleton<JwtHelper>();
            services.AddSingleton<HttpClientHelper>();
            services.AddSingleton<ChatHub>();

            // ���� JWT
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddCookie(options =>
                    {
                        options.Cookie.SameSite = SameSiteMode.Strict;
                        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                        options.Cookie.IsEssential = true;
                    })
                    .AddJwtBearer(options =>
                    {
                        // �����ҥ��ѮɡA�^�����Y�|�]�t WWW-Authenticate ���Y�A�o�̷|��ܥ��Ѫ��Բӿ��~��]
                        options.IncludeErrorDetails = true; // �w�]�Ȭ� true�A���ɷ|�S�O����
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // �z�L�o���ŧi�A�N�i�H�q "sub" ���Ȩó]�w�� User.Identity.Name
                            NameClaimType = ClaimTypes.NameIdentifier,
                            // �z�L�o���ŧi�A�N�i�H�q "roles" ���ȡA�åi�� [Authorize] �P�_����
                            RoleClaimType = ClaimTypes.Role,

                            // �@��ڭ̳��|���� Issuer
                            ValidateIssuer = true,
                            ValidIssuer = Configuration.GetValue<string>("JwtSettings:Issuer"),

                            // �q�`���ӻݭn���� Audience
                            ValidateAudience = false,
                            //ValidAudience = "JwtAuthDemo", // �����ҴN���ݭn��g

                            // �@��ڭ̳��|���� Token �����Ĵ���
                            ValidateLifetime = true,

                            // �p�G Token ���]�t key �~�ݭn���ҡA�@�볣�u��ñ���Ӥw
                            ValidateIssuerSigningKey = false,

                            // "1234567890123456" ���ӱq IConfiguration ���o
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
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
                options.Filters.Add(new AuthorizeFilter(new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build()));
                options.Filters.Add(new ValidateModelAttribute());
            }).AddJsonOptions(options =>
            {
                // Json ��X �w�]�O Camel�A�אּ Null (PascalCase)
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            }).ConfigureApiBehaviorOptions(options =>
            {
                // �������ҥ��Ѯɦ۰� HTTP 400 �^��
                options.SuppressModelStateInvalidFilter = true;
            });

            //services.Configure<FormOptions>(options =>
            //{
            //    options.ValueCountLimit = int.MaxValue;
            //});

            services.AddHttpContextAccessor();
            services.AddControllersWithViews();
            services.AddHttpClient();

            services.AddAntiforgery(options =>
            {
                // �w�]�O false ��� Antiforgery �|�۰ʥͦ� X-Frame-Options SAMEORIGIN
                // �Y�� true �h���۰ʥͦ�
                options.SuppressXFrameOptionsHeader = false;
            });

            services.AddSignalR()
                    .AddJsonProtocol(options =>
                    {
                        options.PayloadSerializerOptions.PropertyNameCaseInsensitive = true;
                        options.PayloadSerializerOptions.PropertyNamingPolicy = null;
                    });
            //.AddMessagePackProtocol();
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">IApplicationBuilder</param>
        /// <param name="env">IWebHostEnvironment</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.Use(async (context, next) =>
            {
                // ���� Iframe �L�k���J�Ӻ���
                // DENY = �����L�k���J Iframe
                // SAMEORIGIN = �ŦX�P���F���h�i�H���J Iframe
                // ALLOW-FROM uri = ���\�Y URI �i�H���J Iframe
                context.Response.Headers.Add("X-Frame-Options", "DENY");
                await next();
            });

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

                if (response.StatusCode == (int)HttpStatusCode.NotFound)
                    response.Redirect("/Home/Error");

                return Task.CompletedTask;
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapHub<ChatHub>("/chatHub");
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Showing API V1");
            });
        }
    }
}