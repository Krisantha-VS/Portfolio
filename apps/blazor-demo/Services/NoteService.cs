using System.Net.Http.Json;
using BlazorDemo.Models;

namespace BlazorDemo.Services;

/// <summary>Calls the PHP backend for note CRUD.</summary>
public sealed class NoteService
{
    private readonly HttpClient _http;
    private readonly TokenStore _tokens;

    public NoteService(HttpClient http, TokenStore tokens)
    {
        _http   = http;
        _tokens = tokens;
    }

    public async Task<List<Note>> GetNotesAsync()
    {
        var req = await BuildRequest(HttpMethod.Get, "notes");
        var res = await _http.SendAsync(req);
        if (!res.IsSuccessStatusCode) return [];
        var wrapper = await res.Content.ReadFromJsonAsync<ApiResponse<List<Note>>>();
        return wrapper?.Data ?? [];
    }

    public async Task<Note?> CreateNoteAsync(CreateNoteRequest request)
    {
        var req = await BuildRequest(HttpMethod.Post, "notes");
        req.Content = JsonContent.Create(request);
        var res = await _http.SendAsync(req);
        if (!res.IsSuccessStatusCode) return null;
        var wrapper = await res.Content.ReadFromJsonAsync<ApiResponse<Note>>();
        return wrapper?.Data;
    }

    public async Task<bool> DeleteNoteAsync(int id)
    {
        var req = await BuildRequest(HttpMethod.Delete, $"notes/{id}");
        var res = await _http.SendAsync(req);
        return res.IsSuccessStatusCode;
    }

    private async Task<HttpRequestMessage> BuildRequest(HttpMethod method, string path)
    {
        var msg   = new HttpRequestMessage(method, path);
        var token = await _tokens.GetAccessTokenAsync();
        if (token is not null)
            msg.Headers.Authorization = new("Bearer", token);
        return msg;
    }

    private sealed class ApiResponse<T>
    {
        public bool Success { get; set; }
        public T?   Data    { get; set; }
    }
}
