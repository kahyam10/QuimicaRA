# ============================================================
# Gerador de Pacote de Codigo-Fonte + Hash SHA-512 para INPI
# Uso: pwsh -File assets/gerar_hash_inpi.ps1
# ============================================================

$ErrorActionPreference = 'Stop'

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$OutputDir   = Join-Path $ProjectRoot 'assets\registro-inpi'
$Timestamp   = Get-Date -Format 'yyyyMMdd-HHmmss'
$ZipName     = "MILI-codigo-fonte-$Timestamp.zip"
$ZipPath     = Join-Path $OutputDir $ZipName
$HashTxtPath = Join-Path $OutputDir "MILI-hash-SHA512-$Timestamp.txt"

# Pastas/arquivos a incluir (apenas codigo-fonte)
$IncludePaths = @(
    'app',
    'components',
    'services',
    'hooks',
    'utils',
    'types',
    'constants',
    'src',
    'styles',
    'data',
    '__tests__',
    'package.json',
    'package-lock.json',
    'tsconfig.json',
    'app.json',
    'eas.json',
    'metro.config.js',
    'expo-env.d.ts',
    'README.md'
)

# Padroes a excluir
$ExcludePatterns = @('*.log', '*.tmp', '.DS_Store', 'Thumbs.db')

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

# Coleta arquivos
Write-Host "Coletando arquivos de codigo-fonte..." -ForegroundColor Cyan
$Files = @()
foreach ($p in $IncludePaths) {
    $full = Join-Path $ProjectRoot $p
    if (Test-Path $full) {
        if ((Get-Item $full).PSIsContainer) {
            $Files += Get-ChildItem -Path $full -Recurse -File -Exclude $ExcludePatterns
        } else {
            $Files += Get-Item $full
        }
    } else {
        Write-Host "  AVISO: nao encontrado: $p" -ForegroundColor Yellow
    }
}

Write-Host "Total de arquivos: $($Files.Count)" -ForegroundColor Green

# Gera o ZIP preservando a estrutura relativa ao ProjectRoot
Write-Host "Gerando ZIP: $ZipName" -ForegroundColor Cyan
if (Test-Path $ZipPath) { Remove-Item $ZipPath -Force }

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::Open($ZipPath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
    foreach ($f in $Files) {
        $rel = $f.FullName.Substring($ProjectRoot.Length + 1).Replace('\','/')
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
            $zip, $f.FullName, $rel,
            [System.IO.Compression.CompressionLevel]::Optimal
        ) | Out-Null
    }
} finally {
    $zip.Dispose()
}

$ZipSizeMB = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
Write-Host "ZIP criado: $ZipSizeMB MB" -ForegroundColor Green

# Gera o hash SHA-512
Write-Host "Calculando hash SHA-512..." -ForegroundColor Cyan
$Hash = Get-FileHash -Path $ZipPath -Algorithm SHA512

# Salva o relatorio de hash
$Report = @"
==============================================================
REGISTRO DE SOFTWARE - RESUMO DIGITAL HASH (SHA-512)
==============================================================
Projeto       : MILI - Aplicativo TCC
Arquivo       : $ZipName
Tamanho       : $ZipSizeMB MB
Data/Hora     : $(Get-Date -Format 'dd/MM/yyyy HH:mm:ss')
Algoritmo     : SHA-512
Total arquivos: $($Files.Count)

Hash SHA-512:
$($Hash.Hash)

==============================================================
Este hash deve ser informado no formulario do INPI (e-INPI)
no campo "Resumo Digital Hash".
==============================================================
"@

Set-Content -Path $HashTxtPath -Value $Report -Encoding UTF8

Write-Host ""
Write-Host "============================================================" -ForegroundColor Green
Write-Host "CONCLUIDO!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host "Pacote ZIP : $ZipPath"
Write-Host "Hash TXT   : $HashTxtPath"
Write-Host ""
Write-Host "SHA-512:" -ForegroundColor Cyan
Write-Host $Hash.Hash
