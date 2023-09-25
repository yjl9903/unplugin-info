/**
 * Port from https://www.npmjs.com/package/package-repo-url and https://www.npmjs.com/package/git-username
 */

import fs from 'node:fs';
import path from 'node:path';

import type { GitRepoInfo } from 'git-repo-info';

import parseGithubUrl from 'parse-github-url';
import remoteOriginUrl from 'remote-origin-url';

const trimSlash = (url: string) => url.replace(/\/$/, '');

const unGitUrl = (url: string) => url.replace(/^git\+/, '').replace(/.git$/, '');

export function getRepoUrl(gitRepoInfo: GitRepoInfo, root = process.cwd()) {
  const getPkg = () => {
    const pkgPath = path.join(root, 'package.json');
    try {
      return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    } catch {
      return undefined;
    }
  };

  const pkg = getPkg();
  if (!pkg) return undefined;

  const url: string | undefined = pkg?.repository?.url ?? pkg?.repository;

  if (url) {
    if (url.startsWith('https:')) {
      return unGitUrl(trimSlash(url));
    }
    if (url.startsWith('git+')) {
      return unGitUrl(url);
    }
    return trimSlash(`https://github.com/${url}`);
  }

  if (!gitRepoInfo.worktreeGitDir) return undefined;

  const remoteUrl = remoteOriginUrl.sync(path.join(gitRepoInfo.worktreeGitDir, 'config'));
  if (!remoteUrl) return undefined;

  const parsed = parseGithubUrl(remoteUrl);
  if (!parsed) return undefined;

  return `https://github.com/${parsed.repo}`;
}
