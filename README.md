# Real-time-stock-data
A project that displays real-time stock data Developed in Angular and .netCore
A real-time stock data visualization system, consisting of a frontend built with Angular 18 and a backend built with ASP.NET Core.  
The system connects to an external API to fetch live stock market data and presents it in an intuitive interface.

---

## Technologies Used

- **Frontend**: Angular 18  
- **Backend**: ASP.NET Core  
- **External API**: Real-time stock market REST API  
- **Languages**: TypeScript (client), C# (server)

---

##  How to Run

### Backend (ASP.NET Core)
1. Open the project in a compatible IDE (e.g., Visual Studio or VS Code with C# support).
2. Run the backend using the `Run` button or via terminal:
   ```bash
   dotnet run
### Frontend (Angular)
Ensure Angular CLI is installed:
npm install -g @angular/cli
Navigate to the frontend project directory:
npm install
ng serve
Open your browser at: http://localhost:4200

Main Features
Real-time stock price updates

External API integration for live data

Modern UI with Angular

Clear separation between frontend and backend

Project Structure

Real-time-stock-data/
├── ClientApp/               # Angular frontend
├── Controllers/             # Backend controllers (C#)
├── Services/                # Internal services for API communication
├── Program.cs               # Server entry point
├── Startup.cs               # Server configuration
└── README.md                # Project documentation

Contributing
Contributions are welcome! Feel free to submit a Pull Request with improvements or bug fixes.
