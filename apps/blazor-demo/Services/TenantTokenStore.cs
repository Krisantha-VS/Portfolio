using Microsoft.JSInterop;

namespace BlazorDemo.Services;

/// <summary>Persists tenant tokens in sessionStorage.</summary>
public sealed class TenantTokenStore(IJSRuntime js)
{
    public Task<string?> GetAccessTokenAsync()  => js.InvokeAsync<string?>("sessionStorage.getItem", "t_access").AsTask();
    public Task<string?> GetRefreshTokenAsync() => js.InvokeAsync<string?>("sessionStorage.getItem", "t_refresh").AsTask();

    public async Task SaveAsync(string access, string refresh, string email, string name, string tenantId)
    {
        await js.InvokeVoidAsync("sessionStorage.setItem", "t_access",    access);
        await js.InvokeVoidAsync("sessionStorage.setItem", "t_refresh",   refresh);
        await js.InvokeVoidAsync("sessionStorage.setItem", "t_email",     email);
        await js.InvokeVoidAsync("sessionStorage.setItem", "t_name",      name);
        await js.InvokeVoidAsync("sessionStorage.setItem", "t_tenant_id", tenantId);
    }

    public async Task<TenantSession?> TryRestoreAsync()
    {
        var access    = await js.InvokeAsync<string?>("sessionStorage.getItem", "t_access");
        var refresh   = await js.InvokeAsync<string?>("sessionStorage.getItem", "t_refresh");
        var email     = await js.InvokeAsync<string?>("sessionStorage.getItem", "t_email");
        var name      = await js.InvokeAsync<string?>("sessionStorage.getItem", "t_name");
        var tenantId  = await js.InvokeAsync<string?>("sessionStorage.getItem", "t_tenant_id");

        if (access is null || email is null || tenantId is null) return null;
        return new TenantSession
        {
            AccessToken  = access,
            RefreshToken = refresh ?? "",
            Email        = email,
            Name         = name   ?? email,
            TenantId     = tenantId,
        };
    }

    public async Task ClearAsync()
    {
        foreach (var key in new[] { "t_access", "t_refresh", "t_email", "t_name", "t_tenant_id" })
            await js.InvokeVoidAsync("sessionStorage.removeItem", key);
    }
}
