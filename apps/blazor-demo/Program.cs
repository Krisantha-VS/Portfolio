using AuthSaas.Client;
using BlazorDemo.Services;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<blazor_demo.App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// ── Config ───────────────────────────────────────────────────────────────────
var authBase   = builder.Configuration["AuthSaas:BaseUrl"]   ?? "http://localhost:3001";
var clientId   = builder.Configuration["AuthSaas:ClientId"]  ?? "";
var apiBase    = builder.Configuration["Api:BaseUrl"]         ?? builder.HostEnvironment.BaseAddress;

// ── AuthSaas SDK ─────────────────────────────────────────────────────────────
builder.Services
    .AddAuthSaas(o =>
    {
        o.BaseUrl  = authBase;
        o.ClientId = clientId;
    })
    .AddTokenStore<TokenStore>();

// ── App services ─────────────────────────────────────────────────────────────
builder.Services.AddSingleton<AuthState>();
builder.Services.AddSingleton<TokenStore>();   // also registered as ITokenStore above

builder.Services.AddHttpClient<NoteService>(c =>
    c.BaseAddress = new Uri(apiBase.TrimEnd('/') + "/modules/notes/"));

// ── Tenant developer dashboard ────────────────────────────────────────────────
builder.Services.AddSingleton<TenantAuthState>();
builder.Services.AddScoped<TenantTokenStore>();
builder.Services.AddHttpClient<TenantApiService>(c =>
    c.BaseAddress = new Uri(authBase.TrimEnd('/') + "/"));

await builder.Build().RunAsync();
