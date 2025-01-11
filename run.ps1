# Navigate to the nodejs-dir and start the Node.js server
Start-Job -ScriptBlock {
    Write-Host "Starting Node.js project in nodejs-dir..."
    Push-Location -Path "tpg_backend"
    npm run start
    Pop-Location
}

# Navigate to the react-dir and start the React project
Start-Job -ScriptBlock {
    Write-Host "Starting React project in react-dir..."
    Push-Location -Path "tpg-client"
    npm run dev
    Pop-Location
}

Write-Host "Both projects are starting in separate jobs. Use Get-Job to view the status or Stop-Job to stop them."
