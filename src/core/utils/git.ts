import { type SimpleGit, simpleGit } from 'simple-git';

import parseGitUrl from 'git-url-parse';

import type { Options } from '../types';

export async function getRepoInfo(root: string, extra: Options['git'] = {}) {
  const git = simpleGit(root);

  if (!(await git.checkIsRepo())) {
    return undefined;
  }

  const [branch, currentCommit, committer, describe, tags, github, result] = await Promise.all([
    getBranch(git),
    getCommit(git),
    getCommitter(git),
    getDescribe(git),
    getTags(git),
    getGitHubUrl(git),
    Promise.all(
      Object.entries(extra).map(async ([key, fn]) => {
        return [key, await fn(git)] as const;
      })
    )
  ] as const);

  return {
    ...branch,
    ...currentCommit,
    ...committer,
    ...describe,
    ...tags,
    ...github,
    ...Object.fromEntries(result)
  };
}

async function getBranch(git: SimpleGit) {
  try {
    const branch = (await git.branch([])).current;
    return { branch };
  } catch (error) {
    return { branch: undefined };
  }
}

async function getCommit(git: SimpleGit) {
  try {
    const log = await git.log(['-1']);
    const sha = log.latest?.hash;
    const commitMessage = log.latest?.message;
    const author = log.latest?.author_name;
    const authorEmail = log.latest?.author_email;
    const authorDate = log.latest?.date;
    return {
      sha,
      abbreviatedSha: sha?.slice(0, 10),
      commitMessage,
      author,
      authorEmail,
      authorDate
    };
  } catch (error) {
    return {
      sha: undefined,
      abbreviatedSha: undefined,
      commitMessage: undefined,
      author: undefined,
      authorEmail: undefined,
      authorDate: undefined
    };
  }
}

function removeLineBreak(str: string) {
  return str.replace(/[\s\r\n]+$/, '');
}

async function getCommitter(git: SimpleGit) {
  try {
    const [committer, committerEmail, committerDate] = await Promise.all([
      git.show(['-s', '--format=%cn']),
      git.show(['-s', '--format=%ce']),
      git.show(['-s', '--format=%cd'])
    ]);
    return {
      committer: removeLineBreak(committer),
      committerEmail: removeLineBreak(committerEmail),
      committerDate: removeLineBreak(committerDate)
    };
  } catch (error) {
    return {
      committer: undefined,
      committerEmail: undefined,
      committerDate: undefined
    };
  }
}

async function getTags(git: SimpleGit) {
  try {
    const hash = await git.revparse(['HEAD']);
    const tags = await git.tags(['--points-at', hash]);
    const all = await git.tags();
    return { tag: tags.all[tags.all.length - 1], tags: tags.all, lastTag: all.latest };
  } catch (error) {
    return { tags: undefined, lastTag: undefined };
  }
}

export async function getDescribe(git: SimpleGit) {
  try {
    const output = await git.raw(['describe', '--always']);
    return {
      describe: removeLineBreak(output)
    };
  } catch (error) {
    return {
      describe: undefined
    };
  }
}

export async function getGitHubUrl(git: SimpleGit) {
  const remotes = await git.getRemotes(true);
  const origin = remotes.find((remote) => remote.name === 'origin');

  const url = origin?.refs.fetch;
  if (url) {
    const parsed = parseGitUrl(url);
    if (parsed.resource === 'github.com' && parsed.full_name) {
      return { github: `https://github.com/${parsed.full_name}` };
    }
  }

  return { github: undefined };
}
