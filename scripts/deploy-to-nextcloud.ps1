param(
  [string]$Destination = "D:\Nextcloud (aragost)\public\bucka-lassen_html"
)

$ErrorActionPreference = 'Stop'

$Source = Split-Path -Parent $PSScriptRoot

$ExcludeDirs = @(
  '.git',
  '.github',
  '.vscode',
  '.idea',
  'node_modules',
  '_temp',
  'drafts',
  'wip',
  'archive',
  '_archive',
  '.claude',
  '.codex'
)

$ExcludeRootDirs = @(
  'scripts'
)

$ExcludeFiles = @(
  '.gitignore',
  '.gitattributes',
  '.DS_Store',
  'Thumbs.db',
  'README.md',
  '*.bak',
  '*.tmp',
  '*.ps1',
  'deploy.ps1'
)

if (-not (Test-Path -LiteralPath $Destination)) {
  New-Item -ItemType Directory -Path $Destination | Out-Null
}

$xd = @()
$xd += $ExcludeDirs
$xd += $ExcludeRootDirs | ForEach-Object { Join-Path $Source $_ }
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
    Where-Object { $ExcludeDirs -contains $_.Name }

  if ($excludedDirMatches) {
    Write-Warning "Excluded directories exist in destination (review/remove if desired):"
    $excludedDirMatches | Select-Object -ExpandProperty FullName | ForEach-Object { Write-Warning "  $_" }
  }

  $excludedRootDirs = $ExcludeRootDirs | ForEach-Object { Join-Path $Destination $_ } | Where-Object { Test-Path -LiteralPath $_ }
  if ($excludedRootDirs) {
    Write-Warning "Excluded root directories exist in destination (review/remove if desired):"
    $excludedRootDirs | ForEach-Object { Write-Warning "  $_" }
  }

  # Report excluded files that exist in the destination (not deleted by /XF)
  $excludedFileMatches = Get-ChildItem -LiteralPath $Destination -File -Recurse -Force -ErrorAction SilentlyContinue |
    Where-Object { $name = $_.Name; $ExcludeFiles | Where-Object { $name -like $_ } }

  if ($excludedFileMatches) {
    Write-Warning "Excluded files exist in destination (review/remove if desired):"
    $excludedFileMatches | Select-Object -ExpandProperty FullName | ForEach-Object { Write-Warning "  $_" }
  }
}

if ($code -le 7) {
  Write-Host "Deploy completed (robocopy exit code $code)."
  exit 0
}

Write-Error "Deploy failed (robocopy exit code $code)."
exit $code
