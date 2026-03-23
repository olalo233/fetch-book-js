
# fetch-book-js 发布脚本 (PowerShell)
# 用途：从 planning-work cherry-pick 提交到 feature/clean-start 并推送到远程
# 使用方法: .\scripts\ship.ps1 &lt;commit-hash&gt;

param(
    [Parameter(Mandatory=$true)]
    [string]$CommitHash
)

$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "fetch-book-js 发布脚本" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 检查当前分支
$CurrentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "当前分支: $CurrentBranch" -ForegroundColor Yellow

if ($CurrentBranch -ne "planning-work") {
    $response = Read-Host "警告: 当前分支不是 planning-work，是否继续？(y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "已取消" -ForegroundColor Red
        exit 1
    }
}

# 检查 commit 是否存在
try {
    git cat-file -e $CommitHash 2&gt;&amp;1 | Out-Null
} catch {
    Write-Host "错误: Commit $CommitHash 不存在" -ForegroundColor Red
    exit 1
}

# 显示 commit 信息
Write-Host ""
Write-Host "要 cherry-pick 的提交:" -ForegroundColor Yellow
git --no-pager show --stat $CommitHash
Write-Host ""

# 确认
$response = Read-Host "是否继续？(y/N)"
if ($response -ne "y" -and $response -ne "Y") {
    Write-Host "已取消" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "步骤 1: 切换到 feature/clean-start" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
git checkout feature/clean-start

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "步骤 2: Cherry-pick 提交 $CommitHash" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
git cherry-pick $CommitHash

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "步骤 3: 推送到远程" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
git push origin feature/clean-start

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "步骤 4: 切回 planning-work" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
git checkout planning-work

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "✅ 发布完成！" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "提交已 cherry-pick 并推送到 feature/clean-start"
Write-Host "可以在 GitHub 上创建 PR: https://github.com/olalo233/fetch-book-js/pull/new/feature/clean-start"

