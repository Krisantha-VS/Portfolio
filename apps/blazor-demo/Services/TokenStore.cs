using AuthSaas.Client;
using Microsoft.JSInterop;

namespace BlazorDemo.Services;

/// <summary>Stores auth tokens in sessionStorage via JS interop.</summary>
public sealed class TokenStore : ITokenStore
{
    private readonly IJSRuntime _js;

    public TokenStore(IJSRuntime js) => _js = js;

    public async Task<string?> GetAccessTokenAsync(CancellationToken ct = default)
        => await _js.InvokeAsync<string?>("sessionStorage.getItem", ct, "bd_access");

    public async Task<string?> GetRefreshTokenAsync(CancellationToken ct = default)
        => await _js.InvokeAsync<string?>("sessionStorage.getItem", ct, "bd_refresh");

    public async Task SaveTokensAsync(string access, string refresh, CancellationToken ct = default)
    {
        await _js.InvokeVoidAsync("sessionStorage.setItem", ct, "bd_access",  access);
        await _js.InvokeVoidAsync("sessionStorage.setItem", ct, "bd_refresh", refresh);
    }

    public async Task ClearAsync(CancellationToken ct = default)
    {
        await _js.InvokeVoidAsync("sessionStorage.removeItem", ct, "bd_access");
        await _js.InvokeVoidAsync("sessionStorage.removeItem", ct, "bd_refresh");
        await _js.InvokeVoidAsync("sessionStorage.removeItem", ct, "bd_user_email");
    }
}
