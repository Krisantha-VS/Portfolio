using System.Text.Json.Serialization;

namespace BlazorDemo.Models;

// ── Auth ─────────────────────────────────────────────────────────────────────

public record TenantLoginRequest(string Email, string Password);

public record TenantRegisterRequest(string Name, string Email, string Password);

public record TenantTokensDto
{
    [JsonPropertyName("accessToken")]  public string AccessToken  { get; init; } = "";
    [JsonPropertyName("refreshToken")] public string RefreshToken { get; init; } = "";
}

public record TenantInfoDto
{
    [JsonPropertyName("id")]    public string Id    { get; init; } = "";
    [JsonPropertyName("name")]  public string Name  { get; init; } = "";
    [JsonPropertyName("email")] public string Email { get; init; } = "";
}

public record TenantAuthResult
{
    [JsonPropertyName("tenant")] public TenantInfoDto   Tenant { get; init; } = new();
    [JsonPropertyName("tokens")] public TenantTokensDto Tokens { get; init; } = new();
}

// ── Apps ─────────────────────────────────────────────────────────────────────

public record TenantAppDto
{
    [JsonPropertyName("id")]             public string   Id             { get; init; } = "";
    [JsonPropertyName("name")]           public string   Name           { get; init; } = "";
    [JsonPropertyName("description")]    public string?  Description    { get; init; }
    [JsonPropertyName("clientId")]       public string   ClientId       { get; init; } = "";
    [JsonPropertyName("isActive")]       public bool     IsActive       { get; init; }
    [JsonPropertyName("allowedOrigins")] public string[] AllowedOrigins { get; init; } = [];
    [JsonPropertyName("createdAt")]      public DateTime CreatedAt      { get; init; }
}

// ── Stats ─────────────────────────────────────────────────────────────────────

public record DashboardStatsDto
{
    [JsonPropertyName("totalApps")]    public int TotalApps    { get; init; }
    [JsonPropertyName("totalUsers")]   public int TotalUsers   { get; init; }
    [JsonPropertyName("activeSessions")]  public int ActiveSessions  { get; init; }
    [JsonPropertyName("totalAuditLogs")]  public int TotalAuditLogs  { get; init; }
}

// ── Users ─────────────────────────────────────────────────────────────────────

public record UserWithRolesDto
{
    [JsonPropertyName("id")]            public string   Id            { get; init; } = "";
    [JsonPropertyName("email")]         public string   Email         { get; init; } = "";
    [JsonPropertyName("name")]          public string?  Name          { get; init; }
    [JsonPropertyName("emailVerified")] public bool     EmailVerified { get; init; }
    [JsonPropertyName("isActive")]      public bool     IsActive      { get; init; }
    [JsonPropertyName("roles")]         public string[] Roles         { get; init; } = [];
    [JsonPropertyName("createdAt")]     public DateTime CreatedAt     { get; init; }
}

// ── Roles ─────────────────────────────────────────────────────────────────────

public record RoleDto
{
    [JsonPropertyName("id")]          public string   Id          { get; init; } = "";
    [JsonPropertyName("name")]        public string   Name        { get; init; } = "";
    [JsonPropertyName("description")] public string?  Description { get; init; }
    [JsonPropertyName("permissions")] public string[] Permissions { get; init; } = [];
    [JsonPropertyName("userCount")]   public int      UserCount   { get; init; }
}

// ── Audit log ─────────────────────────────────────────────────────────────────

public record AuditLogDto
{
    [JsonPropertyName("id")]        public string   Id        { get; init; } = "";
    [JsonPropertyName("action")]    public string   Action    { get; init; } = "";
    [JsonPropertyName("resource")]  public string   Resource  { get; init; } = "";
    [JsonPropertyName("userId")]    public string?  UserId    { get; init; }
    [JsonPropertyName("appId")]     public string?  AppId     { get; init; }
    [JsonPropertyName("ipAddress")] public string?  IpAddress { get; init; }
    [JsonPropertyName("createdAt")] public DateTime CreatedAt { get; init; }
}

public record AuditPageDto
{
    [JsonPropertyName("logs")]  public AuditLogDto[] Logs  { get; init; } = [];
    [JsonPropertyName("total")] public int           Total { get; init; }
    [JsonPropertyName("pages")] public int           Pages { get; init; }
    [JsonPropertyName("page")]  public int           Page  { get; init; }
}

// ── Webhooks ─────────────────────────────────────────────────────────────────

public record WebhookDto
{
    [JsonPropertyName("id")]       public string   Id       { get; init; } = "";
    [JsonPropertyName("url")]      public string   Url      { get; init; } = "";
    [JsonPropertyName("events")]   public string[] Events   { get; init; } = [];
    [JsonPropertyName("secret")]   public string   Secret   { get; init; } = "";
    [JsonPropertyName("isActive")] public bool     IsActive { get; init; }
    [JsonPropertyName("createdAt")] public DateTime CreatedAt { get; init; }
}

public record WebhookDeliveryDto
{
    [JsonPropertyName("id")]          public string   Id          { get; init; } = "";
    [JsonPropertyName("event")]       public string   Event       { get; init; } = "";
    [JsonPropertyName("status")]      public int      Status      { get; init; }
    [JsonPropertyName("response")]    public string?  Response    { get; init; }
    [JsonPropertyName("deliveredAt")] public DateTime? DeliveredAt { get; init; }
    [JsonPropertyName("createdAt")]   public DateTime CreatedAt   { get; init; }
}
