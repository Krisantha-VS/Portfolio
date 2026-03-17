namespace BlazorDemo.Services;

public sealed class TenantSession
{
    public required string AccessToken  { get; init; }
    public required string RefreshToken { get; init; }
    public required string Name         { get; init; }
    public required string Email        { get; init; }
    public required string TenantId     { get; init; }
}

/// <summary>Singleton holding the current tenant session in memory.</summary>
public sealed class TenantAuthState
{
    private TenantSession? _session;

    public bool           IsAuthenticated => _session is not null;
    public TenantSession? Session         => _session;
    public event Action?  OnChange;

    public void SetSession(TenantSession session) { _session = session; OnChange?.Invoke(); }
    public void Clear()                           { _session = null;    OnChange?.Invoke(); }
}
