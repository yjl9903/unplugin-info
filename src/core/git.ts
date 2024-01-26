import { simpleGit } from 'simple-git';

export async function getRepoInfo(root: string) {
  const git = simpleGit(root);

  if (!(await git.checkIsRepo())) {
    return undefined;
  }

  const [branch, currentCommit, commiter, tags] = await Promise.all([
    getBranch(),
    getCommit(),
    getCommitter(),
    getTags()
  ] as const);

  return {
    ...branch,
    ...currentCommit,
    ...commiter,
    ...tags
  };

  async function getBranch() {
    try {
      const branch = (await git.branch([])).current;
      return { branch };
    } catch (error) {
      return { branch: undefined };
    }
  }

  async function getCommit() {
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

  async function getCommitter() {
    try {
      const [committer, committerEmail, committerDate] = await Promise.all([
        git.show(['-s', '--format=%cn']),
        git.show(['-s', '--format=%ce']),
        git.show(['-s', '--format=%cd'])
      ]);
      return {
        committer,
        committerEmail,
        committerDate
      };
    } catch (error) {
      return {
        committer: undefined,
        committerEmail: undefined,
        committerDate: undefined
      };
    }
  }

  async function getTags() {
    try {
      const hash = await git.revparse(['HEAD']);
      const tags = await git.tags(['--points-at', hash]);
      const all = await git.tags();
      return { tag: tags.all[tags.all.length - 1], tags: tags.all, lastTag: all.latest };
    } catch (error) {
      return { tags: undefined, lastTag: undefined };
    }
  }
}
