
#!/usr/bin/env bash

# fetch-book-js 发布脚本
# 用途：从 planning-work cherry-pick 提交到 feature/clean-start 并推送到远程
# 使用方法: ./scripts/ship.sh &lt;commit-hash&gt;

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &amp;&amp; pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# 检查参数
if [ $# -eq 0 ]; then
    echo "错误: 请提供要 cherry-pick 的 commit hash"
    echo "使用方法: $0 &lt;commit-hash&gt;"
    echo ""
    echo "查看最近的提交:"
    git log --oneline -10
    exit 1
fi

COMMIT_HASH=$1

echo "========================================="
echo "fetch-book-js 发布脚本"
echo "========================================="
echo ""

# 检查当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "planning-work" ]; then
    echo "警告: 当前分支不是 planning-work，是否继续？(y/N)"
    read -r response
    if [ "$response" != "y" ] &amp;&amp; [ "$response" != "Y" ]; then
        echo "已取消"
        exit 1
    fi
fi

# 检查 commit 是否存在
if ! git cat-file -e "$COMMIT_HASH" 2&gt;/dev/null; then
    echo "错误: Commit $COMMIT_HASH 不存在"
    exit 1
fi

# 显示 commit 信息
echo ""
echo "要 cherry-pick 的提交:"
git --no-pager show --stat "$COMMIT_HASH"
echo ""

# 确认
echo "是否继续？(y/N)"
read -r response
if [ "$response" != "y" ] &amp;&amp; [ "$response" != "Y" ]; then
    echo "已取消"
    exit 1
fi

echo ""
echo "========================================="
echo "步骤 1: 切换到 feature/clean-start"
echo "========================================="
git checkout feature/clean-start

echo ""
echo "========================================="
echo "步骤 2: Cherry-pick 提交 $COMMIT_HASH"
echo "========================================="
git cherry-pick "$COMMIT_HASH"

echo ""
echo "========================================="
echo "步骤 3: 推送到远程"
echo "========================================="
git push origin feature/clean-start

echo ""
echo "========================================="
echo "步骤 4: 切回 planning-work"
echo "========================================="
git checkout planning-work

echo ""
echo "========================================="
echo "✅ 发布完成！"
echo "========================================="
echo ""
echo "提交已 cherry-pick 并推送到 feature/clean-start"
echo "可以在 GitHub 上创建 PR: https://github.com/olalo233/fetch-book-js/pull/new/feature/clean-start"

