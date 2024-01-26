import { simpleGit } from 'simple-git';

const git = simpleGit();

const branch = (await git.branch([])).current;
console.log(`Branch:`, branch);

const log = await git.log(['-1']);
const sha = log.latest?.hash;
const commitMessage = log.latest?.message;
const author = log.latest?.author_name;
const authorEmail = log.latest?.author_email;
const authorDate = log.latest?.date;

const tags = await git.tags();
const tag = tags.latest;
// console.log(tags, tag);

const committer = (await git.show(['-s', '--format=%cn'])).trim();
const committerEmail = (await git.show(['-s', '--format=%ce'])).trim();
const committerDate = (await git.show(['-s', '--format=%cd'])).trim();
