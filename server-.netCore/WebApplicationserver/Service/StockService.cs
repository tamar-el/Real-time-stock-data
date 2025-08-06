

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebApplicationserver.Models;
using Newtonsoft.Json.Linq;

namespace MyStockApp.Services
{
    public class StockService
    {
        private readonly HttpClient _httpClient;//אובייקט שמבצע קריאות אינטרנט
      //  private readonly string _apiKey = "XKUMX666ZRLD9J0W";
       /// private readonly string _apiKey = "SKK89WVE2KQ6FPYY";
        private readonly string _apiKey = "a28207f55c494b5d948f20546ce30090";

        public StockService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<StockData>> GetStockDataAsync(string symbol)//פונקציה אסינכרונית – מביאה נתונים מהמניה לפי הסימבול שלה
        {
            // string url = $"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&outputsize=full&apikey={_apiKey}";
            string url = $"https://api.twelvedata.com/time_series?symbol={symbol}&interval=1day&outputsize=365&apikey={_apiKey}";
            var response = await _httpClient.GetAsync(url);//פונקציית ספרייה המקבלת כתובת לשליפה

            if (!response.IsSuccessStatusCode)//אם הקריאה נכשלה
                throw new Exception("API request failed");

            string json = await response.Content.ReadAsStringAsync();
            JObject data = JObject.Parse(json);//המרה לjson

            var timeSeries = data["values"];
            if (timeSeries == null)
                throw new Exception("Invalid response");

            var result = new List<StockData>();

            foreach (var item in timeSeries) // ✅ שינוי כאן: לולאה ישירה על מערך JArray
            {
                result.Add(new StockData
                {
                    Date = DateTime.Parse(item["datetime"].ToString()),
                    Open = decimal.Parse(item["open"].ToString()),
                    High = decimal.Parse(item["high"].ToString()),
                    Low = decimal.Parse(item["low"].ToString()),
                    Close = decimal.Parse(item["close"].ToString()),
                    Volume = long.Parse(item["volume"].ToString())
                });
            }


            return result.OrderByDescending(x => x.Date).ToList();
        }
        
//🔹 מקבלת רשימה של נתונים + טווח זמן(למשל: 30 ימים)
//🔹 מחשבת את תאריך ההתחלה הרצוי  
//🔹 מחזירה רק את הימים שמתחילים מהתאריך הזה
        public List<StockData> FilterDataByPeriod(List<StockData> data, TimeSpan period)
        {
            var cutoff = DateTime.Now.Date - period;
            return data.Where(d => d.Date >= cutoff).ToList();
        }
    }
}
