using AuthSaas.Client;

namespace BlazorDemo.Services;

/// <summary>Singleton holding the current auth session in memory.</summary>
public sealed class AuthState
{
    private AuthSession? _session;

    public bool          IsAuthenticated => _session is not null;
    public AuthUser?     User            => _session?.User;
    public AuthTokens?   Tokens          => _session?.Tokens;

    public event Action? OnChange;

    public void SetSession(AuthSession session)
    {
        _session = session;
        OnChange?.Invoke();
    }

    public void Clear()
    {
        _session = null;
        OnChange?.Invoke();
    }
}
