namespace BlazorDemo.Models;

public sealed class Note
{
    public int     Id        { get; set; }
    public string  Title     { get; set; } = "";
    public string  Body      { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}

public sealed record CreateNoteRequest(string Title, string Body);
