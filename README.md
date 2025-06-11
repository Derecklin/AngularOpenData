## 1.專案簡介
一個整合 ASP.NET Core 與 Angular 的全端專案，用於查詢中央氣象署 OpenData API 並顯示各城市的 36 小時天氣預報，前端使用 Angular Material UI 呈現，具備城市選單、Reactive Forms 表單控制、條件變色顯示等功能。

## 2.Demo 截圖
![image](https://github.com/user-attachments/assets/00d91bdd-47ba-4d17-9e2d-9f441dab5052)
![image](https://github.com/user-attachments/assets/aef908e6-83ec-4249-9612-8a1e1a5fd41a)

## 3.線上預覽連結
https://angularopendata.azurewebsites.net

swagger: https://angularopendata.azurewebsites.net/swagger/index.html

## 4.專案安裝指令與執行方式
4.1.開啟 PowerShell 並切換到後端目錄

cd "....下載路徑\AngularOpenData\AngularOpenData.Server"

4.2.確認 HTTPS 憑證已信任（只需做一次）

dotnet dev-certs https --trust

4.3.使用 https 啟動 ASP.NET Core 專案

dotnet run --launch-profile https

4.4.開啟網頁

https://localhost:51789

https://localhost:7224/swagger

## 5.技術架構與特色
### 架構
前端框架:Angular 18,Angular CLI: 18.0.0 ,Node: 20.14.0,Package Manager: npm 10.7.0

UI 套件:Angular Material

後端框架:ASP.NET Core 8 Web API

HTTP 呼叫:	Angular HttpClient / C# HttpClient

API 平台:	中央氣象局 Open Data

前後端整合:	Proxy 設定 (proxy.conf.js)

### 特色
城市切換即時更新：下拉選單可即時切換城市並查詢最新天氣資料。

天氣主題卡片 UI：依據「晴/雨/多雲」狀況套用不同背景色與卡片樣式。

前後端分離：採用 API Proxy 實作前後端分離架構。

API 金鑰保護：使用環境變數或設定檔儲存氣象局金鑰，避免暴露於前端。

### 專案目錄結構摘要
![image](https://github.com/user-attachments/assets/08d67030-933e-49ca-b211-dc1a42b14c62)
