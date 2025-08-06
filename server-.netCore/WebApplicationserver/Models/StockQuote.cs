namespace WebApplicationserver.Models
{
    public class StockData
    {
        public DateTime Date { get; set; }     // תאריך
        public decimal Open { get; set; }      // מחיר פתיחה
        public decimal High { get; set; }      // המחיר הגבוה של אותו יום
        public decimal Low { get; set; }       // המחיר הנמוך של אותו יום
        public decimal Close { get; set; }     // מחיר סגירה
        public long Volume { get; set; }       // נפח מסחר
    }



   
}
