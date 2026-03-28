param(
  [string]$Destination = "D:\Nextcloud (aragost)\public\bucka-lassen_html"
)

$ErrorActionPreference = 'Stop'

$Source = Split-Path -Parent $PSScriptRoot

$ExcludeDirs = @(
  '.git',
  '.claude',
  '_*'
)

$ExcludeRootDirs = @()

$ExcludeFiles = @()

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination | Out-Null
}

$xd = $ExcludeDirs
$xf = $ExcludeFiles

$robocopyArgs = @(
  "`"$Source`"",
  "`"$Destination`"",
  '/MIR',
  '/COPY:DAT',
  '/DCOPY:T',
  '/R:2',
  '/W:2'
)

if ($xd.Count -gt 0) { $robocopyArgs += @('/XD') + $xd }
if ($xf.Count -gt 0) { $robocopyArgs += @('/XF') + $xf }

Write-Host "Deploying from '$Source' to '$Destination'..."
& robocopy @robocopyArgs | Out-Host
$code = $LASTEXITCODE

# Report excluded directories that exist in the destination (not deleted by /XD)
if (Test-Path -LiteralPath $Destination) {
  $excludedDirMatches = Get-ChildItem -LiteralPath $Destination -Directory -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $name = $_.Name; $ExcludeDirs | Where-Object { $name -like $_ } }

  if ($excludedDirMatches) {
    Write-Warning "Excluded directories exist in destination (review/remove if desired):"
    $excludedDirMatches | Select-Object -ExpandProperty FullName | ForEach-Object { Write-Warning "  $_" }
  }
}

if ($code -le 7) {
  Write-Host "Deploy completed (robocopy exit code $code)."
  exit 0
}

Write-Error "Deploy failed (robocopy exit code $code)."
exit $code
