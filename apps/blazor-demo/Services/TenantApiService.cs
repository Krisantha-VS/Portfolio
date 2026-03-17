using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using BlazorDemo.Models;

namespace BlazorDemo.Services;

/// <summary>HTTP client for AuthSaas tenant management API.</summary>
public sealed class TenantApiService(HttpClient http, TenantAuthState auth)
{
    private static readonly JsonSerializerOptions _json = new(JsonSerializerDefaults.Web);

    private void SetAuth()
    {
        http.DefaultRequestHeaders.Remove("Authorization");
        if (auth.Session is not null)
            http.DefaultRequestHeaders.Add("Authorization", $"Bearer {auth.Session.AccessToken}");
    }

    private async Task<T> ParseAsync<T>(HttpResponseMessage res)
    {
        var envelope = await res.Content.ReadFromJsonAsync<ApiEnvelope<T>>(_json)
            ?? throw new Exception("Empty response");
        if (!envelope.Success) throw new Exception(envelope.Error ?? "Request failed");
        return envelope.Data!;
    }

    // ── Tenant Auth ───────────────────────────────────────────────────────────

    public async Task<TenantAuthResult> LoginAsync(string email, string password)
    {
        var res = await http.PostAsJsonAsync("/api/v1/tenant/login", new { email, password });
        return await ParseAsync<TenantAuthResult>(res);
    }

    public async Task<TenantAuthResult> RegisterAsync(string name, string email, string password)
    {
        var res = await http.PostAsJsonAsync("/api/v1/tenant/register", new { name, email, password });
        return await ParseAsync<TenantAuthResult>(res);
    }

    // ── Stats ─────────────────────────────────────────────────────────────────

    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        SetAuth();
        var res = await http.GetAsync("/api/v1/tenant/stats");
        return await ParseAsync<DashboardStatsDto>(res);
    }

    // ── Apps ─────────────────────────────────────────────────────────────────

    public async Task<TenantAppDto[]> GetAppsAsync()
    {
        SetAuth();
        var res = await http.GetAsync("/api/v1/tenant/apps");
        var data = await ParseAsync<AppsEnvelope>(res);
        return data.Apps;
    }

    // ── Users ─────────────────────────────────────────────────────────────────

    public async Task<UserWithRolesDto[]> GetUsersAsync(string appId)
    {
        SetAuth();
        var res = await http.GetAsync($"/api/v1/users?appId={appId}");
        var data = await ParseAsync<UsersEnvelope>(res);
        return data.Users;
    }

    public async Task SetUserRolesAsync(string userId, string appId, string[] roles)
    {
        SetAuth();
        await http.PutAsJsonAsync($"/api/v1/users/{userId}/roles", new { appId, roles });
    }

    public async Task<UserWithRolesDto> ToggleUserAsync(string userId, string appId)
    {
        SetAuth();
        var res = await http.PatchAsJsonAsync($"/api/v1/users/{userId}", new { appId });
        var data = await ParseAsync<UserEnvelope>(res);
        return data.User;
    }

    public async Task DeleteUserAsync(string userId, string appId)
    {
        SetAuth();
        await http.DeleteAsync($"/api/v1/users/{userId}?appId={appId}");
    }

    // ── Roles ─────────────────────────────────────────────────────────────────

    public async Task<RoleDto[]> GetRolesAsync(string appId)
    {
        SetAuth();
        var res = await http.GetAsync($"/api/v1/roles?appId={appId}");
        var data = await ParseAsync<RolesEnvelope>(res);
        return data.Roles;
    }

    // ── Audit log ─────────────────────────────────────────────────────────────

    public async Task<AuditPageDto> GetAuditLogsAsync(string? appId = null, int page = 1, int limit = 20)
    {
        SetAuth();
        var qs = $"?page={page}&limit={limit}";
        if (appId is not null) qs += $"&appId={appId}";
        var res = await http.GetAsync($"/api/v1/tenant/audit{qs}");
        return await ParseAsync<AuditPageDto>(res);
    }

    // ── Webhooks ─────────────────────────────────────────────────────────────

    public async Task<(WebhookDto[] Webhooks, string[] AvailableEvents)> GetWebhooksAsync(string appId)
    {
        SetAuth();
        var res = await http.GetAsync($"/api/v1/webhooks?appId={appId}");
        var data = await ParseAsync<WebhooksEnvelope>(res);
        return (data.Webhooks, data.AvailableEvents);
    }

    public async Task<WebhookDto> CreateWebhookAsync(string appId, string url, string[] events)
    {
        SetAuth();
        var res = await http.PostAsJsonAsync("/api/v1/webhooks", new { appId, url, events });
        var data = await ParseAsync<WebhookCreatedEnvelope>(res);
        return data.Webhook;
    }

    public async Task DeleteWebhookAsync(string webhookId, string appId)
    {
        SetAuth();
        await http.DeleteAsync($"/api/v1/webhooks/{webhookId}?appId={appId}");
    }

    public async Task<WebhookDeliveryDto[]> GetDeliveriesAsync(string webhookId, string appId)
    {
        SetAuth();
        var res = await http.GetAsync($"/api/v1/webhooks/{webhookId}/deliveries?appId={appId}");
        var data = await ParseAsync<DeliveriesEnvelope>(res);
        return data.Deliveries;
    }

    // ── Inner envelope types ──────────────────────────────────────────────────

    private record ApiEnvelope<T>(
        [property: JsonPropertyName("success")] bool Success,
        [property: JsonPropertyName("data")]    T?   Data,
        [property: JsonPropertyName("error")]   string? Error
    );

    private record AppsEnvelope(
        [property: JsonPropertyName("apps")] TenantAppDto[] Apps
    );

    private record UsersEnvelope(
        [property: JsonPropertyName("users")] UserWithRolesDto[] Users
    );

    private record UserEnvelope(
        [property: JsonPropertyName("user")] UserWithRolesDto User
    );

    private record RolesEnvelope(
        [property: JsonPropertyName("roles")] RoleDto[] Roles
    );

    private record WebhooksEnvelope(
        [property: JsonPropertyName("webhooks")]        WebhookDto[] Webhooks,
        [property: JsonPropertyName("availableEvents")] string[]     AvailableEvents
    );

    private record WebhookCreatedEnvelope(
        [property: JsonPropertyName("webhook")] WebhookDto Webhook
    );

    private record DeliveriesEnvelope(
        [property: JsonPropertyName("deliveries")] WebhookDeliveryDto[] Deliveries
    );
}
